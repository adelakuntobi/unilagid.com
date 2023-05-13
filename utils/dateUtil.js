export const parseISOString = (dateString) => {
	const b = dateString.split(/\D+/);
	let date = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));

	let zp = function (val) {
		return val <= 9 ? "0" + val : "" + val;
	};

	let d = date.getDate();
	let m = date.getMonth() + 1;
	let y = date.getFullYear();
	return "" + zp(d) + "/" + zp(m) + "/" + y;
};