alter table subscriptions alter column stripe_customer_id     drop not null;
alter table subscriptions alter column stripe_subscription_id drop not null;
