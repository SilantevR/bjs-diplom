"use strict";

const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    } else {
      throw new Error(response.error);
    }
  });
};

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  } else {
    throw new Error(response.error);
  }
});

const ratesBoard = new RatesBoard();
let timerID;

ApiConnector.getStocks((response) => {
  if (response.success) {
    let refreshRatesBoard = function () {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    };
    refreshRatesBoard();
    timerID = setInterval(refreshRatesBoard, 60000);
  } else {
    throw new Error(response.error);
  }
});

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    } else {
      moneyManager.setMessage(response.success, response.error);
      throw new Error(response.error);
    }
  });
};

moneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    } else {
      moneyManager.setMessage(response.success, response.error);
      throw new Error(response.error);
    }
  });
};

moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    } else {
      moneyManager.setMessage(response.success, response.error);
      throw new Error(response.error);
    }
  });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  } else {
    favoritesWidget.setMessage(response.success, response.error);
    throw new Error(response.error);
  }
});

favoritesWidget.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    } else {
      favoritesWidget.setMessage(response.success, response.error);
      throw new Error(response.error);
    }
  });
};

favoritesWidget.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    } else {
      favoritesWidget.setMessage(response.success, response.error);
      throw new Error(response.error);
    }
  });
};
