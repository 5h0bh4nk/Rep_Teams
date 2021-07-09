export const peerConnectionConfig = {
	'iceServers': [
	 {
		urls: [ "stun:stun.l.google.com:19302" ]
	 },
	 {
		urls: [ "stun:bn-turn1.xirsys.com" ]
	 }, {
		username: "igHRI0ItDbrX-wEflUG_qwtvG6MG6B90uNAWe_YM6xKYCv32g0I1GXQkeBP3aXYyAAAAAGDjYgBzaHViaDRuaw==",
		credential: "f11c8b22-ddc9-11eb-bd8e-0242ac140004",
		urls: [
			"turn:bn-turn1.xirsys.com:80?transport=udp",
			"turn:bn-turn1.xirsys.com:3478?transport=udp",
			"turn:bn-turn1.xirsys.com:80?transport=tcp",
			"turn:bn-turn1.xirsys.com:3478?transport=tcp",
			"turns:bn-turn1.xirsys.com:443?transport=tcp",
			"turns:bn-turn1.xirsys.com:5349?transport=tcp"
		]
	 }
	]
}