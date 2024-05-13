import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: 'CS', value: 400 },
    { name: 'PA', value: 300 },
    { name: 'LAW', value: 300 },
    { name: 'BUSS', value: 200 },
    { name: 'ENG', value: 200 },
];

const COLORS = ['#14B842', '#3B82F6', '#F59E0B', '#1442B8', '#B83B14'];

export default class MejorPirChart extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';

    render() {
        return (

            <div className="container-piechart w-full flex justify-center items-center">
                <div className="container-piechart relative">
                    <div className="text-container text-center justify-center items-center absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <p className='font-bold text-accent'>Total Mejor</p>
                        <p className='font-bold text-accent'>{data.length+1}</p>
                    </div>
                    <PieChart width={263} height={200} onMouseEnter={this.onPieEnter}>
                        <Pie
                            data={data}
                            cx={125}
                            innerRadius={70}
                            outerRadius={95}
                            paddingAngle={0}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
            </div>
        );
    }
}
