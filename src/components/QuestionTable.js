import { Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    table: {
        tableLayout: 'fixed',
    },
}));

export const QuestionTable = (props) => {
    const classes = useStyles();
    return (
        <>
            <Typography variant="h4" gutterBottom align="center">
                {props.label}
            </Typography>
            <Table className={classes.table}>
                <TableBody>
                    {props.rows.map((row) => (
                        <TableRow key={row.key}>
                            <TableCell align="center">{row.sum1}</TableCell>
                            <TableCell align="center">{row.sum2}</TableCell>
                            <TableCell align="center">{row.sum3}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};
