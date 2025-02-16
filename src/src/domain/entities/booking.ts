import { DateRange } from '../value__objects/date_range';
import { Property } from './property';
import { User } from './User';

export class Booking {
  private readonly id: string;
  private readonly property: Property;
  private readonly guest: User;
  private readonly dateRange: DateRange;
  private readonly guestCount: number;
  private readonly status: 'CONFIRMED' | 'CANCELED' = 'CONFIRMED';
  private totalPrice: number;

  constructor(id: string, property: Property, guest: User, dateRange: DateRange, guestCount: number) {
    if (guestCount == 0) {
      throw new Error('O número de hóspedes não pode ser 0');
    }

    property.validateGuestCount(guestCount);

    this.id = id;
    this.property = property;
    this.guest = guest;
    this.dateRange = dateRange;
    this.dateRange = dateRange;
    this.guestCount = guestCount;
    this.totalPrice = property.calculateTotalPrice(dateRange);

    property.addBooking(this);
  }

  getId(): string {
    return this.id;
  }
  getProperty(): Property {
    return this.property;
  }
  getUser(): User {
    return this.guest;
  }
  getDateRange(): DateRange {
    return this.dateRange;
  }
  getGuestCount(): number {
    return this.guestCount;
  }

  getStatus(): 'CONFIRMED' | 'CANCELED' {
    return this.status;
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }
}
