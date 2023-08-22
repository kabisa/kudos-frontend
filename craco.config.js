/* 
Unfortunately we need to use craco to customize the semantic-ui theme. 
Link: https://react.semantic-ui.com/theming
*/
module.exports = {
  plugins: [{ plugin: require('@semantic-ui-react/craco-less') }],
}