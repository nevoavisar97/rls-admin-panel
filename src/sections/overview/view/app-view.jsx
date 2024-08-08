import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSelector } from "react-redux";
import { selectAuth } from 'src/redux/authSlice';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import { GetUserQuestions, GetQuestionAnsInsights, GetTopSubjects } from 'src/api/questions';
import { getInsigths, GetUserInfo } from 'src/api/user';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

export default function AppView() {
  const auth = useSelector(selectAuth);
  const userId = (auth.user);
  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState(null);
  const [questionsAddedThisMonth, setQuestionsAddedThisMonth] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [ansInsights, setAnsInsights] = useState(null);
  const [aiInsights, setAiInsights] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await GetUserQuestions(userId);
        const ansInsights = await GetQuestionAnsInsights(userId);
        const aiInsight = await getInsigths();
        setAnsInsights(ansInsights);
        setQuestions(questions);
        setAiInsights(aiInsight);
      } catch (error) {
        console.error('Error fetching lecture questions:', error);
      }
    };

    fetchQuestions();
  }, [userId]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await GetTopSubjects();
        setSubjects(res);
      } catch (error) {
        console.error('Error fetching subjects', error);
      }
    };

    fetchSubjects();
    console.log(subjects);

  }, []);

  useEffect(() => {
    const getQuestionsAddedThisMonth = () => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      return questions.filter(question => {
        const questionDate = new Date(question.date_submitted);
        return (
          questionDate.getMonth() === currentMonth &&
          questionDate.getFullYear() === currentYear
        );
      }).length;
    };

    setQuestionsAddedThisMonth(getQuestionsAddedThisMonth());
  }, [questions]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await GetUserInfo(userId); // Assuming GetUserInfo takes userId as a parameter
        setUserInfo(userInfo);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  // Transform ansInsights data for AppWebsiteVisits
  const transformInsightsData = (insights) => {
    if (!insights) return {
      labels: [],
      series: [
        { name: 'Total Answers', type: 'column', fill: 'solid', data: [] },
        { name: 'Correct Answers', type: 'area', fill: 'gradient', data: [] },
        { name: 'Wrong Answers', type: 'line', fill: 'solid', data: [] },
      ]
    };

    const labels = insights.map(insight => insight.dateLabel);
    const totalAnswers = insights.map(insight => insight.totalAnswers);
    const correctAnswers = insights.map(insight => insight.correctAnswers);
    const wrongAnswers = insights.map(insight => insight.wrongAnswers);

    return {
      labels,
      series: [
        { name: 'Total Answers', type: 'column', fill: 'solid', data: totalAnswers },
        { name: 'Correct Answers', type: 'area', fill: 'gradient', data: correctAnswers },
        { name: 'Wrong Answers', type: 'line', fill: 'solid', data: wrongAnswers },
      ]
    };
  };

  const chartData = transformInsightsData(ansInsights);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back {userInfo && userInfo.displayName} 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Questions Added This Month"
            total={questionsAddedThisMonth || 0}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Number of Questions"
            total={questions.length || 0}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>
        {aiInsights &&
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title={aiInsights[0]}
              color="warning"
              icon={<LightbulbIcon style={{ color: 'yellow' }} />}
            />
          </Grid>

        }
        {aiInsights &&
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title={aiInsights[1]}
              color="warning"
              icon={<LightbulbIcon style={{ color: 'yellow' }} />}
            />
          </Grid>
        }
        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Question Answers Insights"
            subheader="Insights for the current year"
            chart={chartData}
          />
        </Grid>
        {subjects &&
          <Grid xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Top Subjects by Question Volume"
              chart={{
                series: [
                  { label: subjects[0]["subject"], value: subjects[0]["amount"] },
                  { label: subjects[1]["subject"], value: subjects[1]["amount"] },
                  { label: subjects[2]["subject"], value: subjects[2]["amount"] },
                  { label: subjects[3]["subject"], value: subjects[3]["amount"] },
                ],
              }}
            />
          </Grid>}

      </Grid>
    </Container>
  );
}
