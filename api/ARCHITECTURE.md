# API Architecture Document

API will roughly follow the HyperHypeBeast hexagonal, or
"functional core" architecture:

Elixir contexts

1. `Beef` - Database, persistent state for Kousa

- `Beef.Access` nonmutating queries
- `Beef.Changesets` ingress validation logic
- `Beef.Mutations` mutating queries
- `Beef.Queries` composable Ecto.Query fragments
- `Beef.Schemas` database table schemas

2. `Onion` - OTP-based transient state for Kousa
3. `Broth` - Web interface and contexts

- `Broth.Messages` - contracts for all ws I/O

4. `Okra` - OTP Application, Business Logic, and common toolsets

NB: All of the module contexts will be part of the `:okra` BEAM VM
application under the application supervision tree
