from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Boolean, text, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import enum
from datetime import datetime
import uuid
from app.db.base import Base

class RoleEnum(str, enum.Enum):
    ADMIN = 'admin'
    DISPATCHER = 'dispatcher'
    DRIVER = 'driver'

class ShipmentStatusEnum(str, enum.Enum):
    DRAFT = 'draft'
    ASSIGNED = 'assigned'
    PICKED_UP = 'picked_up'
    IN_TRANSIT = 'in_transit'
    DELIVERED = 'delivered'
    CANCELLED = 'cancelled'

class Organization(Base):
    __tablename__ = "organizations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))

class Membership(Base):
    __tablename__ = "memberships"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), nullable=False) # Supabase auth.users ID
    role = Column(Enum(RoleEnum), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))

class Customer(Base):
    __tablename__ = "customers"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    name = Column(String, nullable=False)
    email = Column(String)
    phone = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))

class Vehicle(Base):
    __tablename__ = "vehicles"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    registration_number = Column(String, nullable=False)
    type = Column(String)
    capacity = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))

class Driver(Base):
    __tablename__ = "drivers"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), nullable=True) # Linked Supabase auth user
    name = Column(String, nullable=False)
    phone = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))

class Shipment(Base):
    __tablename__ = "shipments"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    reference_number = Column(String, nullable=False, unique=True)
    
    origin = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customers.id"), nullable=True)
    driver_id = Column(UUID(as_uuid=True), ForeignKey("drivers.id"), nullable=True)
    vehicle_id = Column(UUID(as_uuid=True), ForeignKey("vehicles.id"), nullable=True)
    
    status = Column(Enum(ShipmentStatusEnum), default=ShipmentStatusEnum.DRAFT, nullable=False)
    expected_delivery = Column(DateTime(timezone=True))
    
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))
    updated_at = Column(DateTime(timezone=True), onupdate=text("now()"))

class ShipmentEvent(Base):
    __tablename__ = "shipment_events"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    shipment_id = Column(UUID(as_uuid=True), ForeignKey("shipments.id"), nullable=False)
    status = Column(Enum(ShipmentStatusEnum), nullable=False)
    notes = Column(String)
    actor_id = Column(UUID(as_uuid=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))

class DeliveryDocument(Base):
    __tablename__ = "delivery_documents"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    shipment_id = Column(UUID(as_uuid=True), ForeignKey("shipments.id"), nullable=False)
    document_type = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    uploaded_by = Column(UUID(as_uuid=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))

class TrackingLink(Base):
    __tablename__ = "tracking_links"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    shipment_id = Column(UUID(as_uuid=True), ForeignKey("shipments.id"), nullable=False)
    token_hash = Column(String, nullable=False, unique=True)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    is_revoked = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))
