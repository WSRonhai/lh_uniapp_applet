export function countDown(counteDate) {
	var timestamp = parseInt(new Date(counteDate).getTime());
	let now = new Date().getTime()
	let gap = timestamp - now
	let seconds = 1000
	let minutes = seconds * 60
	let hours = minutes * 60
	let days = hours * 24
	let d = Math.floor(gap / (days))
	let h = Math.floor((gap % (days)) / (hours))
	let m = Math.floor((gap % (hours)) / (minutes))
	let s = Math.floor((gap % (minutes)) / (seconds))
	// console.log(`距离2027年还有 ${d} 天 ${h} 小时 ${m} 分钟 ${s} 秒 `);
	if (d < 10) {
		d = "0" + d
	} else {
		d = "" + d
	}
	if (h < 10) {
		h = "0" + h
	} else {
		h = "" + h
	}
	if (m < 10) {
		m = "0" + m
	} else {
		m = "" + m
	}
	if (s < 10) {
		s = "0" + s
	} else {
		s = "" + s
	}
	let overTime = {
		day: d,
		hour: h,
		minute: m,
		second: s
	}
	if (d > 0 || h > 0 || m > 0 || s > 0) {
		return overTime
	} else {
		return false
	}

}

export function changeDateStr(str) {
	let newstr = str.split('-').join('/')
	return newstr
};
