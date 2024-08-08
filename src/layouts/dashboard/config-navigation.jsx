import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Management',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Documentation',
    path: '/documentation',
    icon: icon('ic_documentation'),
  },
];

export default navConfig;
