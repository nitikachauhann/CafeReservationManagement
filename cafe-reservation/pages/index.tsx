import React, { useState } from 'react';

interface Reservation {
    customerName: string;
    partySize: number;
    reservationDate: string;
    reservationTime: string;
    priority: number;
}

const IndexPage: React.FC = () => {
    const [customerName, setCustomerName] = useState<string>('');
    const [partySize, setPartySize] = useState<number>(1);
    const [reservationDate, setReservationDate] = useState<string>(''); 
    const [reservationTime, setReservationTime] = useState<string>(''); 
    const [priority, setPriority] = useState<number>(1);
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newReservation: Reservation = {
            customerName,
            partySize,
            reservationDate,
            reservationTime,
            priority,
        };
        setReservations([...reservations, newReservation]);
        // Clear form fields
        setCustomerName('');
        setPartySize(1);
        setReservationDate('');
        setReservationTime('');
        setPriority(1);
    };

    return (
        <div style={{
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '20px', 
            fontFamily: 'Lora, serif', 
            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
            borderRadius: '10px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            backgroundImage: 'url(/path/to/cafe-background.jpg)', // Add cafe-related background image
            backgroundSize: 'cover', 
            backgroundPosition: 'center'
        }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#5D4037' }}>Cafe Table Reservation Management</h1>

            <h2 style={{ marginBottom: '20px', color: '#795548' }}>Make a Reservation</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <label style={{ fontWeight: 'bold', color: '#3E2723' }}>
                    Customer Name:
                    <input 
                        type="text" 
                        value={customerName} 
                        onChange={(e) => setCustomerName(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #BCAAA4' }}
                    />
                </label>

                <label style={{ fontWeight: 'bold', color: '#3E2723' }}>
                    Party Size:
                    <input 
                        type="number" 
                        value={partySize} 
                        onChange={(e) => setPartySize(Number(e.target.value))} 
                        min={1} 
                        required 
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #BCAAA4' }}
                    />
                </label>

                <label style={{ fontWeight: 'bold', color: '#3E2723' }}>
                    Reservation Date:
                    <input 
                        type="date" 
                        value={reservationDate} 
                        onChange={(e) => setReservationDate(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #BCAAA4' }}
                    />
                </label>

                <label style={{ fontWeight: 'bold', color: '#3E2723' }}>
                    Reservation Time (HH:mm):
                    <input 
                        type="time" 
                        value={reservationTime} 
                        onChange={(e) => setReservationTime(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #BCAAA4' }}
                    />
                </label>

                <label style={{ fontWeight: 'bold', color: '#3E2723' }}>
                    Priority (1-15, 15 being highest):
                    <input 
                        type="number" 
                        value={priority} 
                        onChange={(e) => setPriority(Number(e.target.value))} 
                        min={1} 
                        max={15} 
                        required 
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #BCAAA4' }}
                    />
                </label>

                <button 
                    type="submit" 
                    style={{
                        padding: '10px', 
                        backgroundColor: '#795548', 
                        color: 'white', 
                        border: 'none', 
                        cursor: 'pointer', 
                        marginTop: '15px', 
                        borderRadius: '5px',
                        fontWeight: 'bold'
                    }}
                >
                    Make Reservation
                </button>
            </form>

            <h2 style={{ marginTop: '30px', color: '#795548' }}>Current Reservations</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '2px solid #795548', padding: '10px' }}>Customer Name</th>
                        <th style={{ borderBottom: '2px solid #795548', padding: '10px' }}>Party Size</th>
                        <th style={{ borderBottom: '2px solid #795548', padding: '10px' }}>Reservation Date</th>
                        <th style={{ borderBottom: '2px solid #795548', padding: '10px' }}>Reservation Time</th>
                        <th style={{ borderBottom: '2px solid #795548', padding: '10px' }}>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation, index) => (
                        <tr key={index}>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{reservation.customerName}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{reservation.partySize}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{reservation.reservationDate}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{reservation.reservationTime}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{reservation.priority}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IndexPage;
