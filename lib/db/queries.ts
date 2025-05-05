import { desc, and, eq, isNull } from 'drizzle-orm';
import { db } from './drizzle';
import { activityLogs, teamMembers, teams, users } from './schema';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';

export async function getUser() {
  const cookieStore = cookies();
  const session = cookieStore.get('session')?.value;
  
  if (!session) {
    return null;
  }
  
  try {
    const payload = await verifyToken(session);
    
    if (!payload || !payload.user || !payload.user.id) {
      return null;
    }
    
    const user = await db
      .select()
      .from(users)
      .where(and(
        eq(users.id, payload.user.id),
        isNull(users.deleted_at)
      ))
      .limit(1);
    
    return user[0] || null;
  } catch (error) {
    console.error('Session verification error:', error);
    return null;
  }
}

export async function getTeamByStripeCustomerId(customerId: string) {
  const team = await db
    .select()
    .from(teams)
    .where(eq(teams.stripe_customer_id, customerId))
    .limit(1);
  
  return team[0] || null;
}

export async function updateTeamSubscription(
  teamId: number,
  subscriptionData: {
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string;
  }
) {
  await db
    .update(teams)
    .set({
      stripe_subscription_id: subscriptionData.stripeSubscriptionId,
      stripe_product_id: subscriptionData.stripeProductId,
      plan_name: subscriptionData.planName,
      subscription_status: subscriptionData.subscriptionStatus,
      updated_at: new Date()
    })
    .where(eq(teams.id, teamId));
}

export async function getUserWithTeam(userId: number) {
  const member = await db
    .select({
      user: users,
      team: teams,
      role: teamMembers.role
    })
    .from(teamMembers)
    .innerJoin(users, eq(users.id, teamMembers.user_id))
    .innerJoin(teams, eq(teams.id, teamMembers.team_id))
    .where(eq(teamMembers.user_id, userId))
    .limit(1);
  
  if (!member[0]) {
    return null;
  }
  
  return {
    user: member[0].user,
    team: member[0].team,
    role: member[0].role
  };
}

export async function getActivityLogs() {
  const user = await getUser();
  
  if (!user) {
    return [];
  }
  
  const userWithTeam = await getUserWithTeam(user.id);
  
  if (!userWithTeam || !userWithTeam.team) {
    return [];
  }
  
  const logs = await db
    .select({
      id: activityLogs.id,
      action: activityLogs.action,
      timestamp: activityLogs.timestamp,
      ipAddress: activityLogs.ip_address,
      user: {
        id: users.id,
        name: users.name,
        email: users.email
      }
    })
    .from(activityLogs)
    .leftJoin(users, eq(users.id, activityLogs.user_id))
    .where(eq(activityLogs.team_id, userWithTeam.team.id))
    .orderBy(desc(activityLogs.timestamp))
    .limit(100);
  
  return logs;
}

export async function getTeamForUser() {
  const user = await getUser();
  
  if (!user) {
    return null;
  }
  
  // Modified to use standard select instead of findFirst
  const memberQuery = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.user_id, user.id))
    .limit(1);
  
  if (!memberQuery[0]) {
    return null;
  }
  
  const teamId = memberQuery[0].team_id;
  
  // Get the team
  const teamQuery = await db
    .select()
    .from(teams)
    .where(eq(teams.id, teamId))
    .limit(1);
  
  if (!teamQuery[0]) {
    return null;
  }
  
  // Get all team members
  const allTeamMembers = await db
    .select({
      teamMember: teamMembers,
      user: {
        id: users.id,
        name: users.name,
        email: users.email
      }
    })
    .from(teamMembers)
    .innerJoin(users, eq(users.id, teamMembers.user_id))
    .where(eq(teamMembers.team_id, teamId));
  
  // Format the response
  return {
    ...teamQuery[0],
    teamMembers: allTeamMembers.map(tm => ({
      ...tm.teamMember,
      user: tm.user
    }))
  };
}
