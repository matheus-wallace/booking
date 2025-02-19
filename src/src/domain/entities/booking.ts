import { DateRange } from '../value__objects/date_range';
import { Property } from './property';
import { User } from './User';

export class Booking {
  private readonly id: string;
  private readonly property: Property;
  private readonly guest: User;
  private readonly dateRange: DateRange;
  private readonly guestCount: number;
  private status: 'CONFIRMED' | 'CANCELLED' = 'CONFIRMED';
  private totalPrice: number;

  constructor(id: string, property: Property, guest: User, dateRange: DateRange, guestCount: number) {
    if (guestCount == 0) {
      throw new Error('O número de hóspedes não pode ser 0');
    }

    property.validateGuestCount(guestCount);

    if (!property.isAvalable(dateRange)) {
      throw new Error('A propriedade não está disponível no período selecionado.');
    }

    this.id = id;
    this.property = property;
    this.guest = guest;
    this.dateRange = dateRange;
    this.dateRange = dateRange;
    this.guestCount = guestCount;
    this.totalPrice = property.calculateTotalPrice(dateRange);
    this.status = 'CONFIRMED';

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

  getStatus(): 'CONFIRMED' | 'CANCELLED' {
    return this.status;
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }

  cancel(currentDate: Date): void {
    if (this.status === 'CANCELLED') {
      throw new Error('A reserva já foi cancelada');
    }

    this.status = 'CANCELLED';

    const checkInDate = this.dateRange.getStartDate();
    const timeDiff = checkInDate.getTime() - currentDate.getTime();
    const daysUntilCheckIn = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysUntilCheckIn > 7) {
      this.totalPrice = 0;
    } else if (daysUntilCheckIn >= 1) {
      this.totalPrice *= 0.5;
    }
  }
}
