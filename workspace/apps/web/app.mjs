import Overrides        from './overrides/Overwrites.mjs';
import Logger           from './src/Logger.mjs';
import MainContainer    from './view/MainContainer.mjs';

export const onStart = () => {
    Neo.app({
        mainView: MainContainer,
        name: 'Web'
    });
};