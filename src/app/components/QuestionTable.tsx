import { Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Row } from '../../core/generator/Generator';

const useStyles = makeStyles(() => ({
    table: {
        tableLayout: 'fixed',
    },
}));

interface QuestionTableProps {
    label: string;
    rows: Row[];
}

export const QuestionTable = (props: QuestionTableProps) => {
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
                            <TableCell align="center">{row.sums[0]}</TableCell>
                            <TableCell align="center">{row.sums[1]}</TableCell>
                            <TableCell align="center">{row.sums[2]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};
