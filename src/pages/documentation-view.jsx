import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function DocumentationView() {
  const renderHeader = (
    <Box
      component="header"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        lineHeight: 0,
        position: 'fixed',
        p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
      }}
    >

    </Box>
  );

  return (
    <>
      {renderHeader}

      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 720,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'left',
            alignItems: 'left',
            flexDirection: 'column',
            justifyContent: 'left',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            Project Documentation
          </Typography>

          <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
            Dashboard Overview
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 3 }}>
            Welcome to the RLS Moderator Dashboard! Here, lecturers can manage their questions which will be displayed randomly in the game. This dashboard helps you to add new questions, view detailed insights on how students are performing, and manage your existing questions.
          </Typography>

          <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
            Submitting Questions
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 3 }}>
            To submit a new question:
            <ol>
              <li>Navigate to the "Add Question" section.</li>
              <li>Fill in the question content and all the answer options.</li>
              <li>Specify the correct answer by indicating its index (1-4).</li>
              <li>Assign a subject to the question.</li>
              <li>Click on "Submit" to save the question.</li>
            </ol>
          </Typography>

          <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
            Generating Questions with AI
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 3 }}>
            To generate a new question using AI:
            <ol>
              <li>Navigate to the "Generate Question with AI" section.</li>
              <li>Enter the subject for which you want to generate a question.</li>
              <li>Click on "Generate with AI" to create a question based on the subject.</li>
              <li>Review the generated question and make any necessary adjustments.</li>
              <li>Click on "Submit" to save the AI-generated question.</li>
            </ol>
          </Typography>

          <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
            Viewing Insights
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 3 }}>
            To view insights about the students' answers:
            <ol>
              <li>Find the question you want insights for in the list of questions.</li>
              <li>Click on the three-dot menu on the right side of the question.</li>
              <li>Select "Insights" from the dropdown menu.</li>
              <li>You will see detailed statistics on how students have answered the question, including the percentage of correct and incorrect answers.</li>
            </ol>
          </Typography>

          <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
            Managing Questions
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 3 }}>
            To manage your questions:
            <ol>
              <li>Find the question you want to delete in the list of questions.</li>
              <li>Click on the three-dot menu on the right side of the question.</li>
              <li>Select "Delete" from the dropdown menu to remove the question.</li>
            </ol>
          </Typography>

          <Button href="/" size="large" variant="contained" component={RouterLink} sx={{ mt: 5 }}>
            Go to Home
          </Button>
        </Box>
      </Container>
    </>
  );
}
