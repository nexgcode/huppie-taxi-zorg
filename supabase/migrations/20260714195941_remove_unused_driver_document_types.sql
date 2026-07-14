alter table public.driver_application_documents
  drop constraint if exists driver_application_documents_document_type_check,
  add constraint driver_application_documents_document_type_check
    check (document_type in ('driver_license', 'driver_card')) not valid;
