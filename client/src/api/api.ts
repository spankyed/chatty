const baseURL = 'http://localhost:3001/api/';

export default {};
//   getRooms,
//   createRoom
// }

// async function getRooms() {
// 	const method = "GET";
// 	const headers = { "Content-Type": "application/json; charset=utf-8" };
// 	const url = `${baseHttpUrl}/get-rooms`;
// 	const response = await fetch(url, { method, headers });
// 	if (response.ok) {
// 		const rooms = await response.json();
// 		console.log("%c Fetch Rooms", "color:blue;", rooms);
// 		return rooms;
// 	}
// }

// async function createRoom(gameOptions) {
// 	const method = "POST";
// 	const headers = { "Content-Type": "application/json; charset=utf-8" };
// 	const body = JSON.stringify({ gameOptions, clientID, TOKEN });
// 	const url = `${baseHttpUrl}/create-room`;
// 	const response = await fetch(url, { method, headers, body });
// 	if (response.ok) {
// 		const res = await response.json();
// 		console.log("%c New Room", "color:blue;", res);
// 		handlers.create(res);
// 		return res;
// 	} else if (response.status === 401) { // res is not defined
// 		handlers.unauthorize();
// 		throw Error("Unauthorized");
// 	}
// }

// setClient(JSON.parse(localStorage.getItem("client") || '""'));

// function setClient(client) {
// 	clientID = client.clientID;
// 	TOKEN = client.TOKEN;
// 	username = client.username;
// 	localStorage.setItem(
// 		"client",
// 		JSON.stringify({ clientID, TOKEN, username })
// 	);
// }
// function eraseCookie(name) {   
//     document.cookie = name+'=; Max-Age=-99999999;';  
// }
// function setMessageHandlers(newHandlers) {
// 	Object.assign(handlers, newHandlers);
// }


// Promise.all([
//   fetch('https://api.github.com/users/iliakan'),
//   fetch('https://api.github.com/users/taylorotwell')
// ])
// .then(async([res1, res2]) => {
//   const a = await res1.json();
//   const b = await res2.json();
//   console.log(a.login + ' has ' + a.public_repos + ' public repos on GitHub');
//   console.log(b.login + ' has ' + b.public_repos + ' public repos on GitHub');
// })
// .catch(error => {
//   console.log(error);
// });

