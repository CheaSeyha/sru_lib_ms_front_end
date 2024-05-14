import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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
            <div className="PieChart-Uni flex flex-col w-[304px] h-full bg-secondary rounded-[20px] p-5">
                <div className="chart ">
                    <div className="text-table w-full h-[45px] flex">
                        <p>Mejor Vistor</p>
                    </div>
                    <div className="container-piechart w-full justify-center items-center ">
                        <div className="container-piechart relative ">
                            <div className="text-container text-center justify-center items-center absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                <p className='font-bold text-accent'>Total Mejor</p>
                                <p className='font-bold text-accent'>{data.length}</p>
                            </div>
                            <PieChart width={263} height={200}>
                                <Pie
                                    data={data}
                                    cx={125}
                                    innerRadius={70}
                                    outerRadius={95}
                                    paddingAngle={0}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </div>
                    </div>
                </div>
                {/* List Data of major entry  */}
                <div className="listaData-mejor h-full  flex flex-col">
                    <div className="header flex justify-between">
                        <p className='font-bold bg'></p>
                        <div className="text-conatienr flex w-full justify-between ps-7">
                            <p>Mejor</p>
                            <p>Total</p>
                        </div>
                    </div>
                    <div className="flex-1  dataContainer h-full grid items-center cursor-pointer">
                        {data.map((e, index) => (
                            <div key={index} className="dataOfMejor flex items-center text-[12px] hover:-translate-x-2 transition-all ease-in-out hover:bg-[#ffffff54] rounded-lg">
                                <div className="w-[10px] h-[10px]  rounded-lg"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <div className="div flex justify-between w-full ps-5">
                                    <p className="w-fit h-fit">{e.name}</p>
                                    <p>{e.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* List Data of major entry  */}
            </div>
        );
    }
}
