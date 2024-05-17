import React, { useState, useEffect } from 'react';
import './style/Table.css'
const TableComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://pai-project-1-831bcc92ff5d.herokuapp.com/api/data');
            const jsonData = await response.json();
            jsonData.forEach(item => {
                const [dateString, timeString] = item.actualDate.split(', ');
                const [day, month, year] = dateString.split('/').map(part => parseInt(part, 10));
                const [time, period] = timeString.split(' ');
                let [hours, minutes, seconds] = time.split(':').map(part => parseInt(part, 10));
                if (period === 'p. m.' && hours !== 12) {
                    hours += 12;
                } else if (period === 'a. m.' && hours === 12) {
                    hours = 0;
                }
                item.parsedDate = new Date(year, month - 1, day, hours, minutes,seconds);
            });

            jsonData.sort((a, b) => {
                if (a.parsedDate.getTime() === b.parsedDate.getTime()) {
                    return a.parsedDate.getHours() - b.parsedDate.getHours();
                }
                return b.parsedDate.getTime() - a.parsedDate.getTime();
            });
            console.log(jsonData)
            setData(jsonData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>Tabla de Datos Obtenidos por Raspberry pi Zero 2W</h1>
            <table>
                <thead>
                    <tr>
                        <th>id_planta</th>
                        <th>Fecha/Hora</th>
                        <th>mH</th>
                        <th>Pho_7in1</th>
                        <th>Pot_7in1</th>
                        <th>Nit_7in1</th>
                        <th>Moi_7in1</th>
                        <th>Tem_7in1</th>
                        <th>Ph_7in1</th>
                        <th>Con_7in1</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item._id}>
                            <td>{item.ID_plant}</td>
                            <td>{item.actualDate}</td>
                            <td>{item.mH}</td>
                            <td>{item.Pho_7in1}</td>
                            <td>{item.Pot_7in1}</td>
                            <td>{item.Nit_7in1}</td>
                            <td>{item.Moi_7in1}</td>
                            <td>{item.Tem_7in1}</td>
                            <td>{item.Ph_7in1}</td>
                            <td>{item.Con_7in1}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
