import { NextApiRequest, NextApiResponse } from 'next'
import { createReservation, getReservations } from '../../lib/reservationService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { customerName, partySize, reservationTime, priority } = req.body
      const result = await createReservation(customerName, partySize, new Date(reservationTime), priority)
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create reservation' })
    }
  } else if (req.method === 'GET') {
    try {
      const reservations = await getReservations()
      res.status(200).json(reservations)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reservations' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}