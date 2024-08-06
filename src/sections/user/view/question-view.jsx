import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import QuestionForm from 'src/sections/overview/user/view/questions-form';
import { DeleteSelectedQuestions, GetUserQuestions, fetchQuestions, getTips, GetQuestionInsights } from 'src/api/questions'; // Your API call to get questions

import Iconify from 'src/components/iconify/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import QuestionTableRow from '../question-table-row';
import UserTableHead from '../user-table-head'; // Reusing the head component
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar'; // Reusing the toolbar component
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function QuestionPage() {
  const [id, setId] = useState(localStorage.getItem("logged"));
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [orderBy, setOrderBy] = useState('index'); // Default order by index
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [questionAdded, setQuestionAdded] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false); // State for managing form popup
  const [showInsights, setShowInsights] = useState(false);
  const [currentInsightId, setCurrentInsightId] = useState(null);
  const [insights, setInsights] = useState(null);

  const openInsights = async (questionId) => {
    try {
      const fetchedInsights = await GetQuestionInsights(questionId);
      setCurrentInsightId(questionId);
      setInsights(fetchedInsights);
      setShowInsights(true);
    } catch (error) {
      console.error('Error fetching insights:', error);
    }
  };

  const closeInsights = () => {
    setShowInsights(false);
    setCurrentInsightId(null);
    setInsights(null);
  };

  useEffect(() => {
    const fetchMyQuestions = async () => {
      try {
        const fetchedQuestions = await GetUserQuestions(JSON.parse(localStorage.getItem("logged")));
        const questionsWithIndex = fetchedQuestions.map((question, index) => ({
          ...question,
          index,
        }));
        setQuestions(questionsWithIndex);
        
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchMyQuestions();
  }, []);

  useEffect(() => {
    const fetchMyQuestions = async () => {
      try {
        const fetchedQuestions = await GetUserQuestions(JSON.parse(localStorage.getItem("logged")));
        const questionsWithIndex = fetchedQuestions.map((question, index) => ({
          ...question,
          index,
        }));
        setQuestions(questionsWithIndex);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchMyQuestions();
    setQuestionAdded(false);
  }, [questionAdded]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = questions.map((n) => n.content);
      const newSelectedsIds = questions.map((n) => n.id);
      setSelectedId(newSelectedsIds);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  
  const handleClick = (event, content, id) => {
    const selectedIndex = selected.indexOf(content);
    const selectedIdIndex = selectedId.indexOf(id);
    let newSelected = [];
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, content);
      newSelectedIds = newSelectedIds.concat(selectedId, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedIds = newSelectedIds.concat(selectedId.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedIds = newSelectedIds.concat(selectedId.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newSelectedIds = newSelectedIds.concat(
        selectedId.slice(0, selectedIdIndex),
        selectedId.slice(selectedIdIndex + 1)
      );
    }

    setSelected(newSelected);
    setSelectedId(newSelectedIds);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFormOpen = () => {
    setShowQuestionForm(true);
  };
  
  const deleteSelected = async () => {
    const selectedIdsString = selectedId.join(',');
    const deleted = await DeleteSelectedQuestions(selectedIdsString);
    if (deleted) {
      setQuestionAdded(true);
      setSelected([]);
    }
  };

  const handleFormClose = () => {
    setShowQuestionForm(false);
  };

  const dataFiltered = applyFilter({
    inputData: questions,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Questions</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleFormOpen}>
          New Question
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          onDeleteSelected={deleteSelected}
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={questions.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'content', label: 'Question' },
                  { id: 'answer1', label: 'Answer 1' },
                  { id: 'answer2', label: 'Answer 2' },
                  { id: 'answer3', label: 'Answer 3' },
                  { id: 'answer4', label: 'Answer 4' },
                  { id: 'correctAnswer', label: 'Correct Answer' },
                  { id: 'subject', label: 'Subject' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <QuestionTableRow
                      key={row.id}
                      question={row}
                      selected={selected.indexOf(row.content) !== -1}
                      handleClick={(event) => handleClick(event, row.content, row.id)}
                      questionsEdited={setQuestionAdded}
                      openInsights={openInsights}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, questions.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={questions.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      {/* Popup for Insights */}
      {showInsights && (
        <div style={{ zIndex: "999999", position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: "black", padding: '20px', borderRadius: "10px" }}>
          {insights ? (
            <div>
              <h2>Insights for Question ID: {currentInsightId}</h2>
              <p>Total Answers: {insights.totalAnswers}</p>
              <p>Correct Answers: {insights.correctAnswers}</p>
              <p>Wrong Answers: {insights.wrongAnswers}</p>
              <p>Percentage Correct: {insights.percentageCorrect}%</p>
              <p>Percentage Wrong: {insights.percentageWrong}%</p>
              <p>Most Common Wrong Answer: {insights.mostCommonWrongAnswer}</p>
              <p>Unique Users: {insights.uniqueUsers}</p>
              <button onClick={closeInsights}>Close</button>
            </div>
          ) : (
            <p>Loading insights...</p>
          )}
        </div>
      )}
      {/* Popup for Question Form */}
      {showQuestionForm && (
        <div style={{ zIndex: "1234", position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: "white", padding: '2px', borderRadius: "10px" }}>
          <QuestionForm open={true} onClose={handleFormClose} onSubmit={(formData) => setQuestionAdded(true)} />
        </div>
      )}
    </Container>
  );
}
