# Security & Permission Matrix

## Roles
1. **Admin**: Full access to organization settings, memberships, billing, and all operational entities.
2. **Dispatcher**: Manages shipments, assignments, drivers, and vehicles. Cannot manage billing or admins.
3. **Driver**: Limited to viewing assigned shipments, updating their status, and uploading proof of delivery.

## Permission Matrix
| Entity / Action | Admin | Dispatcher | Driver | Customer (Tracking) |
|-----------------|-------|------------|--------|---------------------|
| Organization | R/W | R | None | None |
| Memberships | R/W | None | None | None |
| Customers | R/W | R/W | None | None |
| Vehicles | R/W | R/W | None | None |
| Drivers | R/W | R/W | Self(R) | None |
| Shipments | R/W | R/W | Assigned(R/W status) | Tracking-link(R limited) |
| Delivery Docs | R/W | R/W | Assigned(W) | None |

## API Security
- **Authentication**: Bearer token (Supabase JWT) verified in FastAPI.
- **Authorization**: Extracted `sub` matched against `memberships` table for role and `organization_id`.
- **Tenant Isolation**: SQLAlchemy sets transaction-local configuration variables to limit database access to the current tenant (via RLS).
