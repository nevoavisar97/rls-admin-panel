import { useState } from 'react';
import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { DeleteQuestion } from 'src/api/questions';

// ----------------------------------------------------------------------

export default function QuestionTableRow({ questionsEdited, selected, question, handleClick, openInsights }) {
  const [open, setOpen] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
    
  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setCurrentQuestionId(id);
  };

  const handleInsightsClick = () => {
    openInsights(currentQuestionId);
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setCurrentQuestionId(null);
  };

  const handleDelete = async () => {
    // Perform the delete operation using currentQuestionId
    const deleted = await DeleteQuestion(currentQuestionId);
    if (deleted) {
      questionsEdited(true);
    }
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={() => handleClick(question.id)} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Typography variant="subtitle2" noWrap>
            {question.content}
          </Typography>
        </TableCell>

        <TableCell>{question.answers[0]}</TableCell>
        <TableCell>{question.answers[1]}</TableCell>
        <TableCell>{question.answers[2]}</TableCell>
        <TableCell>{question.answers[3]}</TableCell>
        <TableCell>{question.correctAnswer + 1}</TableCell>
        <TableCell>{question.subject}</TableCell>

        <TableCell align="right">
          <IconButton onClick={(event) => handleOpenMenu(event, question.id)}>
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
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleInsightsClick}>
          <Iconify icon="mdi:lightbulb-on-outline" sx={{ mr: 2 }} />
          Insights
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

QuestionTableRow.propTypes = {
  question: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  questionsEdited: PropTypes.func.isRequired,
};
