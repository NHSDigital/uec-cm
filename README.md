# uec cm

The Capacity Management System (CMS) is a single, trustworthy, accurate, official source of the data relating to service/unit capacity across the whole of the NHS in England.

Which then provides this positive change:

Improving the way that the data can be viewed and analysed/disseminated, so that decisions can be made with the knowledge of the current and future status of the capacity of the business

There is an expectation that each file of this repository template is concise and self-documented.

This repo contains the following:
- `docs/adr` Contains the ADR 'decisions'
- `infrastructure/` Contains infrastructure related Terraform templates for deploying the app.
- `scripts/` Various scripts including githooks, functions etc.
- `tests/` Contains tests related to the app

## Contributing

To ensure consistency and turn on the required githooks contributors must run the following script from the project root see below

/bin/bash scripts/git/git-config-set-up.sh

## Licence

> The [LICENCE.md](./LICENCE.md) file will need to be updated with the correct year and owner

Unless stated otherwise, the codebase is released under the MIT License. This covers both the codebase and any sample code in the documentation.

Any HTML or Markdown documentation is [© Crown Copyright](https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/) and available under the terms of the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).
