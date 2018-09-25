// Entry point for your plugin
// This should expose your plugin's modules
/* START IMPORTS */
import FooterPlugin from './Footer';
/* END IMPORTS */

/* START EXPORTS */

export const metadata = {
  name: '@bpanel/bpanel-footer',
  pathName: '',
  displayName: 'bPanel Footer',
  author: 'bcoin-org',
  description:
    'A simple footer to display chain sync progress and bcoin version',
  version: require('../package.json').version
};

// Decorate a target component (e.g. Footer, Header, Sidebar)
export const decorateFooter = (Footer, { React, PropTypes }) => {
  return class extends React.PureComponent {
    constructor(props) {
      super(props);
    }

    static displayName() {
      return metadata.name;
    }

    static get propTypes() {
      return {
        theme: PropTypes.object,
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        version: PropTypes.string,
        agent: PropTypes.string,
        progress: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        footerWidgets: PropTypes.arrayOf(PropTypes.func)
      };
    }

    componentWillMount() {
      const { progress, version, height, agent } = this.props;
      const progressPercentage = progress * 100;
      this.footer = FooterPlugin({
        progress: progressPercentage,
        height,
        version,
        agent
      });
    }

    componentWillUpdate({ progress: nextProgress, version, height, agent }) {
      const { progress } = this.props;
      const progressPercentage = nextProgress * 100;

      if (nextProgress > progress) {
        this.footer = FooterPlugin({
          progress: progressPercentage,
          version, height, agent
        });
      }
    }

    render() {
      const { footerWidgets = [] } = this.props;
      footerWidgets.push(this.footer);
      return <Footer {...this.props} footerWidgets={footerWidgets} />;
    }
  };
};

// Tells the decorator what our plugin needs from the state
// This is available for container components that use an
// extended version of react-redux's connect to connect
// a container to the state and retrieve props
// make sure to replace the corresponding state mapping
// (e.g. `state.chain.height`) and prop names
export const mapComponentState = {
  Footer: (state, map) =>
    Object.assign(map, {
      version: state.node.node.version,
      progress: state.chain.progress,
      height: state.chain.height,
      agent: state.node.pool ? state.node.pool.agent : undefined
    })
};

/* END EXPORTS */
