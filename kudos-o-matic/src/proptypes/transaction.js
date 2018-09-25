import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  author: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired
  }),
  message: PropTypes.string.isRequired,
  kudos: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  created_on: PropTypes.string.isRequired
});
