drop policy "Admins can update contact submissions" on public.contact_submissions;
drop policy "Admins can update ride requests" on public.ride_requests;
drop policy "Admins can update partner requests" on public.partner_requests;
drop policy "Admins can update driver applications" on public.driver_applications;

create policy "Huppie admins can update contact submissions"
on public.contact_submissions for update to authenticated
using ((select auth.jwt() ->> 'email') like '%@huppietaxi.nl')
with check ((select auth.jwt() ->> 'email') like '%@huppietaxi.nl');

create policy "Huppie admins can update ride requests"
on public.ride_requests for update to authenticated
using ((select auth.jwt() ->> 'email') like '%@huppietaxi.nl')
with check ((select auth.jwt() ->> 'email') like '%@huppietaxi.nl');

create policy "Huppie admins can update partner requests"
on public.partner_requests for update to authenticated
using ((select auth.jwt() ->> 'email') like '%@huppietaxi.nl')
with check ((select auth.jwt() ->> 'email') like '%@huppietaxi.nl');

create policy "Huppie admins can update driver applications"
on public.driver_applications for update to authenticated
using ((select auth.jwt() ->> 'email') like '%@huppietaxi.nl')
with check ((select auth.jwt() ->> 'email') like '%@huppietaxi.nl');
