import MainContainer from './MainContainer.mjs';

export const onStart = () => Neo.app({
    appThemeFolder: 'web',
    mainView: MainContainer,
    name    : Neo.newAppName
});
