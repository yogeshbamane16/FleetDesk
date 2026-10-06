"""Initial migration

Revision ID: bc65f4e66a25
Revises: 
Create Date: 2026-10-06 22:37:33.407722

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'bc65f4e66a25'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create ENUMs
    role_enum = postgresql.ENUM('ADMIN', 'DISPATCHER', 'DRIVER', name='roleenum')
    role_enum.create(op.get_bind())
    
    shipment_status_enum = postgresql.ENUM('DRAFT', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED', name='shipmentstatusenum')
    shipment_status_enum.create(op.get_bind())

    op.create_table('organizations',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('memberships',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('organization_id', sa.UUID(), nullable=False),
    sa.Column('user_id', sa.UUID(), nullable=False),
    sa.Column('role', postgresql.ENUM(name='roleenum', create_type=False), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['organization_id'], ['organizations.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('customers',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('organization_id', sa.UUID(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('phone', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['organization_id'], ['organizations.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('vehicles',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('organization_id', sa.UUID(), nullable=False),
    sa.Column('registration_number', sa.String(), nullable=False),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('capacity', sa.String(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['organization_id'], ['organizations.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('drivers',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('organization_id', sa.UUID(), nullable=False),
    sa.Column('user_id', sa.UUID(), nullable=True),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('phone', sa.String(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['organization_id'], ['organizations.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('shipments',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('organization_id', sa.UUID(), nullable=False),
    sa.Column('reference_number', sa.String(), nullable=False),
    sa.Column('origin', sa.String(), nullable=False),
    sa.Column('destination', sa.String(), nullable=False),
    sa.Column('customer_id', sa.UUID(), nullable=True),
    sa.Column('driver_id', sa.UUID(), nullable=True),
    sa.Column('vehicle_id', sa.UUID(), nullable=True),
    sa.Column('status', postgresql.ENUM(name='shipmentstatusenum', create_type=False), nullable=False),
    sa.Column('expected_delivery', sa.DateTime(timezone=True), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], ),
    sa.ForeignKeyConstraint(['driver_id'], ['drivers.id'], ),
    sa.ForeignKeyConstraint(['organization_id'], ['organizations.id'], ),
    sa.ForeignKeyConstraint(['vehicle_id'], ['vehicles.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('reference_number')
    )
    op.create_table('delivery_documents',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('shipment_id', sa.UUID(), nullable=False),
    sa.Column('document_type', sa.String(), nullable=False),
    sa.Column('file_path', sa.String(), nullable=False),
    sa.Column('uploaded_by', sa.UUID(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['shipment_id'], ['shipments.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('shipment_events',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('shipment_id', sa.UUID(), nullable=False),
    sa.Column('status', postgresql.ENUM(name='shipmentstatusenum', create_type=False), nullable=False),
    sa.Column('notes', sa.String(), nullable=True),
    sa.Column('actor_id', sa.UUID(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['shipment_id'], ['shipments.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tracking_links',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('shipment_id', sa.UUID(), nullable=False),
    sa.Column('token_hash', sa.String(), nullable=False),
    sa.Column('expires_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('is_revoked', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['shipment_id'], ['shipments.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('token_hash')
    )


def downgrade() -> None:
    op.drop_table('tracking_links')
    op.drop_table('shipment_events')
    op.drop_table('delivery_documents')
    op.drop_table('shipments')
    op.drop_table('drivers')
    op.drop_table('vehicles')
    op.drop_table('customers')
    op.drop_table('memberships')
    op.drop_table('organizations')
    
    postgresql.ENUM(name='roleenum').drop(op.get_bind())
    postgresql.ENUM(name='shipmentstatusenum').drop(op.get_bind())
