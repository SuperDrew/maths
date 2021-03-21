import {Table, TableBody, TableCell, TableRow, Typography} from "@material-ui/core";
import React from "react";

export const QuestionGrid = (props) =>
{
    const min = props.min;
    const max = props.max;

    function randBetween(min, max) {
        return Math.round(Math.random()*(max-min)+min);
    }

    function generateRandomAdditionSum(min, max) {
        return `${randBetween(min, max)} + ${randBetween(min, max)} = [    ]`;
    }

    function createRow(min, max, rowNumber) {
        return {
            key: rowNumber,
            sum1: generateRandomAdditionSum(min,max),
            sum2: generateRandomAdditionSum(min,max),
            sum3: generateRandomAdditionSum(min,max)
        };
    }

    const rows = [];
    for (let i = 0; i <= 10; i++) {
        rows.push(createRow(min, max, i))
    }

    return (
        <>
            <Typography variant="h2" id="discrete-slider-custom" gutterBottom align="center">
                {props.label}
            </Typography>
            <Table>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.key}>
                            <TableCell align="right">{row.sum1}</TableCell>
                            <TableCell align="right">{row.sum2}</TableCell>
                            <TableCell align="right">{row.sum3}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}