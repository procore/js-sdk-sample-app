import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

let tokenInfo = document.head.querySelector('[name=tokenInfo]').getAttribute('content') || '{}';
tokenInfo = JSON.parse(tokenInfo);

export function TokenInfo() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Access Token</TableCell>
            <TableCell>Expires At</TableCell>
            <TableCell>Current UTC Time</TableCell>
            <TableCell>Refresh Token</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{tokenInfo.accessToken || 'Not Available'}</TableCell>
            <TableCell>{tokenInfo.expiresAt || 'Not Available'}</TableCell>
            <TableCell>{new Date().toISOString().slice(0, -5) + "Z"}</TableCell>
            <TableCell>{tokenInfo.refreshToken || 'Not Available'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
