import React from 'react';
import PropTypes from 'prop-types';
import { Text, utils, widgetCreator } from '@bpanel/bpanel-ui';

const { connectTheme } = utils;

const Footer = ({ progress, version: _version, theme, height, agent }) => {
  let version = _version;
  if (agent)
    version = agent.replace(/\//g, '');
  return (
  <div className="col order-1">
    <div className="row">
      <div className="col version text-truncate">
        <Text className={theme.footer.text}>{version}</Text>
      </div>
      <div className={`${theme.footer.progress} col text-truncate`}>
        <Text className={theme.footer.text}>{progress.toFixed(2)}% synced</Text>
      </div>
      <div className="col text-truncate">
        <Text className={theme.footer.text}>height: {height}</Text>
      </div>
    </div>
  </div>
);
}

Footer.propTypes = {
  theme: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  version: PropTypes.string,
  agent: PropTypes.string,
  progress: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default widgetCreator(connectTheme(Footer));
