import { query } from './db'; // Import the query function
import { RowDataPacket } from 'mysql2';

interface Table {
  id: number;
  capacity: number;
  status: 'available' | 'reserved';
}

interface Reservation {
  id: number;
  customerName: string;
  partySize: number;
  reservationTime: Date;
  priority: number;
  tableId: number | null;
  status: 'pending' | 'confirmed' | 'cancelled';
}

class PriorityScheduler {
  private tables: Table[] = [];

  constructor(tables: Table[]) {
    this.tables = tables;
  }

  findAvailableTable(partySize: number): Table | null {
    return (
      this.tables.find(table => table.status === 'available' && table.capacity >= partySize) || null
    );
  }

  scheduleReservations(reservations: Reservation[]): Reservation[] {
    const sortedReservations = reservations.sort((a, b) => b.priority - a.priority);
    const scheduledReservations: Reservation[] = [];

    for (const reservation of sortedReservations) {
      const availableTable = this.findAvailableTable(reservation.partySize);
      if (availableTable) {
        reservation.tableId = availableTable.id;
        reservation.status = 'confirmed';
        availableTable.status = 'reserved';
        scheduledReservations.push(reservation);
      }
    }

    return scheduledReservations;
  }
}

export async function createReservation(
  customerName: string,
  partySize: number,
  reservationTime: Date,
  priority: number
): Promise<Reservation> {
  const [result] = await query<RowDataPacket[]>(
    'INSERT INTO reservations (customer_name, party_size, reservation_time, priority, status) VALUES (?, ?, ?, ?, ?)',
    [customerName, partySize, reservationTime, priority, 'pending']
  );

  const newReservation: Reservation = {
    id: result.insertId,
    customerName,
    partySize,
    reservationTime,
    priority,
    tableId: null,
    status: 'pending',
  };

  await scheduleReservations();

  return newReservation;
}

export async function getReservations(): Promise<Reservation[]> {
  const [rows] = await query<RowDataPacket[]>('SELECT * FROM reservations');
  return rows as Reservation[];
}

async function scheduleReservations() {
  const [tables] = await query<RowDataPacket[]>('SELECT * FROM tables');
  const [reservations] = await query<RowDataPacket[]>('SELECT * FROM reservations WHERE status = "pending"');

  const scheduler = new PriorityScheduler(tables as Table[]);
  const scheduledReservations = scheduler.scheduleReservations(reservations as Reservation[]);

  for (const reservation of scheduledReservations) {
    await query(
      'UPDATE reservations SET table_id = ?, status = ? WHERE id = ?',
      [reservation.tableId, reservation.status, reservation.id]
    );
    await query('UPDATE tables SET status = ? WHERE id = ?', ['reserved', reservation.tableId]);
  }
}

import { RowDataPacket } from 'mysql2'

interface Table {
  id: number
  capacity: number
  status: 'available' | 'reserved'
}

interface Reservation {
  id: number
  customerName: string
  partySize: number
  reservationTime: Date
  priority: number
  tableId: number | null
  status: 'pending' | 'confirmed' | 'cancelled'
}

class PriorityScheduler {
  private tables: Table[] = []

  constructor(tables: Table[]) {
    this.tables = tables
  }

  findAvailableTable(partySize: number): Table | null {
    return this.tables.find(table => table.status === 'available' && table.capacity >= partySize) || null
  }

  scheduleReservations(reservations: Reservation[]): Reservation[] {
    const sortedReservations = reservations.sort((a, b) => b.priority - a.priority)
    const scheduledReservations: Reservation[] = []

    for (const reservation of sortedReservations) {
      const availableTable = this.findAvailableTable(reservation.partySize)
      if (availableTable) {
        reservation.tableId = availableTable.id
        reservation.status = 'confirmed'
        availableTable.status = 'reserved'
        scheduledReservations.push(reservation)
      }
    }

    return scheduledReservations
  }
}

export async function createReservation(customerName: string, partySize: number, reservationTime: Date, priority: number): Promise<Reservation> {
  const [result] = await pool.query<RowDataPacket[]>(
    'INSERT INTO reservations (customer_name, party_size, reservation_time, priority, status) VALUES (?, ?, ?, ?, ?)',
    [customerName, partySize, reservationTime, priority, 'pending']
  )

  const newReservation: Reservation = {
    id: result.insertId,
    customerName,
    partySize,
    reservationTime,
    priority,
    tableId: null,
    status: 'pending',
  }

  await scheduleReservations()

  return newReservation
}

export async function getReservations(): Promise<Reservation[]> {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM reservations')
  return rows as Reservation[]
}

async function scheduleReservations() {
  const [tables] = await pool.query<RowDataPacket[]>('SELECT * FROM tables')
  const [reservations] = await pool.query<RowDataPacket[]>('SELECT * FROM reservations WHERE status = "pending"')

  const scheduler = new PriorityScheduler(tables as Table[])
  const scheduledReservations = scheduler.scheduleReservations(reservations as Reservation[])

  for (const reservation of scheduledReservations) {
    await pool.query(
      'UPDATE reservations SET table_id = ?, status = ? WHERE id = ?',
      [reservation.tableId, reservation.status, reservation.id]
    )
    await pool.query('UPDATE tables SET status = ? WHERE id = ?', ['reserved', reservation.tableId])
  }
}