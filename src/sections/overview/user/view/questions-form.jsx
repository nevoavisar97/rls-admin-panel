import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { BsStars } from "react-icons/bs";
import { getTips, insertQuestion, getAllSubjects } from 'src/api/questions';

export default function QuestionForm({ open, onClose, onSubmit }) {
  const [formState, setFormState] = useState({
    content: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctAnswer: 0,
    subject:''
  });

  const [showGenerateField, setShowGenerateField] = useState(false); // State for showing/hiding the Generate AI field
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // State for submission success message
  const [aiText, setAiText] = useState(''); // State for AI generated text

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRadioChange = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      correctAnswer: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    // Validation logic
    const { content, answer1, answer2, answer3, answer4, correctAnswer, subject } = formState;
    if (!content || !answer1 || !answer2 || !answer3 || !answer4 || !correctAnswer || !subject ) {
      alert('All fields are required, including the correct answer.');
      return;
    }
    const q = {
      //id: '2182848282',
      content: formState.content,
      answers: [formState.answer1, formState.answer2, formState.answer3, formState.answer4],
      correctAnswer: parseInt(formState.correctAnswer),
      lecturerID: JSON.parse(localStorage.getItem("logged")),
      subject:formState.subject
      //date_submitted: new Date().toISOString()
    }
    const added = await insertQuestion(q);
    if (added) {
      onSubmit(formState);
      setFormState({
        content: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        subject: '',
        correctAnswer: ''
      });
      setSubmissionSuccess(true); // Set the success message state to true
      onSubmit(formState);
      setTimeout(() => setSubmissionSuccess(false), 10000); // Hide the message after 3 seconds
    }
    else alert("error might occured, try agian later");
  };

  const handleGenerate = async () => {
    let query = aiText;
    if(query=='') query = "random topic related to software/data engineering";
    const tip = await getTips(query);
    if (tip) {
      setFormState({
        content: tip.content,
        answer1: tip.answer1,
        answer2: tip.answer2,
        answer3: tip.answer3,
        answer4: tip.answer4,
        subject: tip.subject,
        correctAnswer: tip.correctAnswer
      });
      setShowGenerateField(false);
    }
  };

  const handleGenerateAI = () => {
    setShowGenerateField(true); // Show the Generate AI field when clicked
  };

  const handleCancelGenerateAI = () => {
    setShowGenerateField(false); // Hide the Generate AI field
  };

  const handleAiTextChange = (event) => {
    setAiText(event.target.value);
  };

  return (
    <div style={{ display: open ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.9)', color: 'white', padding: '30px', borderRadius: '8px' }}>
      <TextField
        label="Question"
        name="content"
        value={formState.content}
        onChange={handleChange}
        fullWidth
        variant="filled"
        style={{ marginBottom: '10px' }}
        InputProps={{
          style: { backgroundColor: 'black', color: 'white' },
        }}
      />
      <TextField
        label="Answer 1"
        name="answer1"
        value={formState.answer1}
        onChange={handleChange}
        fullWidth
        variant="filled"
        style={{ marginBottom: '10px' }}
        InputProps={{
          style: { backgroundColor: 'black', color: 'white' },
        }}
      />
      <TextField
        label="Answer 2"
        name="answer2"
        value={formState.answer2}
        onChange={handleChange}
        fullWidth
        variant="filled"
        style={{ marginBottom: '10px' }}
        InputProps={{
          style: { backgroundColor: 'black', color: 'white' },
        }}
      />
      <TextField
        label="Answer 3"
        name="answer3"
        value={formState.answer3}
        onChange={handleChange}
        fullWidth
        variant="filled"
        style={{ marginBottom: '10px' }}
        InputProps={{
          style: { backgroundColor: 'black', color: 'white' },
        }}
      />
      <TextField
        label="Answer 4"
        name="answer4"
        value={formState.answer4}
        onChange={handleChange}
        fullWidth
        variant="filled"
        style={{ marginBottom: '10px' }}
        InputProps={{
          style: { backgroundColor: 'black', color: 'white' },
        }}
      />

      <FormLabel component="legend" style={{ marginLeft: 10, marginTop: '10px', color: 'white', marginBottom: '10px' }}>Correct Answer</FormLabel>
      <RadioGroup
        aria-label="correct-answer"
        name="correctAnswer"
        value={formState.correctAnswer}
        onChange={handleRadioChange}
        style={{ marginLeft: 10, marginBottom: 10 }}
        row
      >
        <FormControlLabel value="0" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />} label="1" />
        <FormControlLabel value="1" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />} label="2" />
        <FormControlLabel value="2" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />} label="3" />
        <FormControlLabel value="3" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />} label="4" />
      </RadioGroup>

      <TextField
        label="Subject"
        name="subject"
        value={formState.subject}
        onChange={handleChange}
        fullWidth
        variant="filled"
        style={{ marginBottom: '10px' }}
        InputProps={{
          style: { backgroundColor: 'black', color: 'white' },
        }}
      />
      {submissionSuccess && <span style={{ color: 'green', marginBottom: 10 }}>Question submitted successfully!</span>}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 }}>
        <div>
          <Button variant="contained" style={{ background: "#313030", color: 'white', borderRadius: '5px', marginRight: 18 }} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" style={{ color: 'white', borderRadius: '5px' }} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
      {showGenerateField && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <TextField
            label="Generate with AI - Leave empty for a surprise topic"
            placeholder='Your question subject'
            fullWidth
            variant="filled"
            style={{ marginBottom: '10px', backgroundColor: 'black', color: 'white' }}
            value={aiText}
            onChange={handleAiTextChange}
          />
          <div>
            <Button
              variant="contained"
              style={{ background: "#313030", color: 'white', borderRadius: '5px', marginRight: '10px' }}
              onClick={handleCancelGenerateAI}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ color: 'white', borderRadius: '5px' }}
              onClick={handleGenerate}
            >
              Generate
            </Button>
          </div>
        </div>
      )}
      {!showGenerateField && (
        <div style={{ marginTop: '18px', textAlign: 'left' }}>
          <Button
            variant="contained"
            style={{ background: "#c44b4b", color: 'white', borderRadius: '5px' }}
            onClick={handleGenerateAI}
            startIcon={<BsStars />} // Stars icon
          >
            Generate with AI
          </Button>
        </div>
      )}
    </div>
  );
}

QuestionForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};