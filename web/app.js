window.Telegram.WebApp.expand();
const tgUser = Telegram.WebApp.initDataUnsafe?.user;
console.log('Utilisateur Telegram :', tgUser?.first_name);

const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: 'https://insanecorporation.github.io/ton-connect-page/ton-connect.json',
  buttonRootId: 'ton-connect',
});

async function sendDataToBot(walletAddress) {
  const data = {
    telegram_id: tgUser?.id,
    telegram_username: tgUser?.username,
    wallet: walletAddress,
  };

  await fetch('https://tonyserver.com/api/connect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  Telegram.WebApp.close();
}

tonConnectUI.onStatusChange((walletInfo) => {
  if (walletInfo?.account?.address) {
    console.log('Wallet connecté à InsaneApp :', walletInfo.account.address);
    sendDataToBot(walletInfo.account.address);
  }
});
