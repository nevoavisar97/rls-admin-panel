import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { updateStatus } from 'src/api/user';
import { sendEmail } from 'src/api/emailService';

// ----------------------------------------------------------------------

export default function UserTableRow({
  name,
  avatarUrl,
  email,
  status,
  questions,
  handleClick,
  updateUserStatusInState, // Receive the function here
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleAuthorization = async () => {
    const res = await updateStatus(email, "Authorized");
    if (res) {
      const templateParams = {
        from_name: "Ruppin Last Stand | Admin",
        to_name: name,
        to_email: email,
        message: 'You have been authorized to access our system.',
      };
      await sendEmail(templateParams);
      updateUserStatusInState(email, "Authorized"); // Update the state after authorization
    }
    console.log(res);
  };

  const handleDeny = async () => {
    const res = await updateStatus(email, "Denied");
    if (res) {
      const templateParams = {
        from_name: "Ruppin Last Stand | Admin",
        to_name: name,
        to_email: email,
        message: 'Your access request has been denied. For further information, please contact admin@rls.com.',
      };
      await sendEmail(templateParams);
      updateUserStatusInState(email, "Denied"); // Update the state after denial
    }
    console.log(res);
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>

        <TableCell component="th" scope="row" padding="100px">
          <Stack direction="row" alignItems="center" spacing={3}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{questions}</TableCell>

        <TableCell>
          <Label color={
            status === 'Pending' ? 'warning' :
              status === 'Denied' ? 'error' :
                'success'
          }>
            {status}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleAuthorization}>
          <Iconify icon="eva:checkmark-circle-2-fill" sx={{ mr: 2 }} />
          Approve
        </MenuItem>

        <MenuItem onClick={handleDeny} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:close-circle-fill" sx={{ mr: 2 }} />
          Deny
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  email: PropTypes.any,
  handleClick: PropTypes.func,
  questions: PropTypes.any,
  name: PropTypes.any,
  status: PropTypes.string,
  updateUserStatusInState: PropTypes.func.isRequired, // Add prop validation
};
