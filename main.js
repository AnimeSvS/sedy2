const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const moment = require('moment-timezone')
const { wait, banner, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')
const { color } = require('./lib/color')
const _welkom = JSON.parse(fs.readFileSync('./database/welcome.json'))

require('./punyapv.js')
nocache('./punyapv.js', module => console.log(`${module} telah di update!`))

const starts = async (punyapv = new WAConnection()) => {
    punyapv.logger.level = 'warn'
    punyapv.version = [2, 2142, 12]
    function _0x13fe(_0x39fc1a,_0x45b350){var _0x39ac1d=_0x39ac();return _0x13fe=function(_0x13febf,_0x4ecf24){_0x13febf=_0x13febf-0x6f;var _0x45e757=_0x39ac1d[_0x13febf];return _0x45e757;},_0x13fe(_0x39fc1a,_0x45b350);}var _0x990a20=_0x13fe;(function(_0x13ff47,_0x19ca6c){var _0x17082d=_0x13fe,_0x5cb542=_0x13ff47();while(!![]){try{var _0x2a55ca=-parseInt(_0x17082d(0x78))/0x1+parseInt(_0x17082d(0x6f))/0x2+parseInt(_0x17082d(0x7a))/0x3+parseInt(_0x17082d(0x75))/0x4*(parseInt(_0x17082d(0x77))/0x5)+-parseInt(_0x17082d(0x74))/0x6+parseInt(_0x17082d(0x71))/0x7+-parseInt(_0x17082d(0x70))/0x8;if(_0x2a55ca===_0x19ca6c)break;else _0x5cb542['push'](_0x5cb542['shift']());}catch(_0x59a8d7){_0x5cb542['push'](_0x5cb542['shift']());}}}(_0x39ac,0x9b8e8),punyapv[_0x990a20(0x79)]=[_0x990a20(0x73),_0x990a20(0x72),_0x990a20(0x76)]);function _0x39ac(){var _0x18fec1=['Chrome','Little King','4393512RhSMKO','4782628IXZaxn','3.0.0','5Mroiho','809718xoHOFQ','browserDescription','3767283fpRIJk','1194524brbBtR','7251896eQmmOE','258559Vtipax'];_0x39ac=function(){return _0x18fec1;};return _0x39ac();}
    punyapv.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color(' apúrale aweonado !!'))
    })
      const sendButImage = async (from, context, fotext, img, but) => {
    gam = img
    jadinya = await punyapv.prepareMessage(from, gam, MessageType.image)
    buttonMessagesI = {
      imageMessage: jadinya.message.imageMessage,
      contentText: context,
      footerText: fotext,
      buttons: but,
      headerType: 4
    }
    punyapv.sendMessage(from, buttonMessagesI, MessageType.buttonsMessage)
  }

    fs.existsSync('./session.json') && punyapv.loadAuthInfo('./session.json')
    punyapv.on('connecting', () => {
        start('2', 'Bienvenido........')
    })
    punyapv.on('open', () => {
        success('2', 'listo!')
    })
    await punyapv.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session.json', JSON.stringify(punyapv.base64EncodedAuthInfo(), null, '\t'))

    punyapv.on('chat-update', async (message) => {
        require('./punyapv.js')(punyapv, message, _welkom)
    })
punyapv.on("group-participants-update", async (anu) => {

    const isWelkom = _welkom.includes(anu.jid)
    try {
      groupMet = await punyapv.groupMetadata(anu.jid)
      groupMembers = groupMet.participants
      groupAdmins = getGroupAdmins(groupMembers)
      mem = anu.participants[0]

      console.log(anu)
      try {
        pp_user = await punyapv.getProfilePicture(mem)
      } catch (e) {
        pp_user = "https://telegra.ph/file/c9dfa715c26518201f478.jpg"
      }
      try {
        pp_grup = await punyapv.getProfilePicture(anu.jid)
      } catch (e) {
        pp_grup =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60"
      }
      if (!isWelkom) return
      if (anu.action == 'add') {
	  num = anu.participants[0]
	  mdata = await punyapv.groupMetadata(anu.jid)
      memeg = mdata.participants.length
      let v = punyapv.contacts[num] || { notify: num.replace(/@.+/, "") }
      anu_user = v.vname || v.notify || num.split("@")[0]
      time_wel = moment.tz("Asia/Jakarta").format("HH:mm")
	  try {
	  ppimg = await punyapv.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
	  } catch {
	  ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
	  }
	  image = await getBuffer(
      `http://hadi-api.herokuapp.com/api/card/welcome?nama=${anu_user}&descriminator=${groupMembers.length
       }&memcount=${memeg}&gcname=${encodeURI(
       mdata.subject
       )}&pp=${pp_user}&bg=https://telegra.ph/file/a3cec6902ea32d08a6db4.jpg`
       )
	  teks = `Bienvenido *@${num.split('@')[0]}* al grupo*${mdata.subject}*

No olvides la introducción :

⊛ *Nombre :*
⊛ *ID:*



Espero que disfrutes estar en este grupo. `
	  let buff = await getBuffer(ppimg)
	  punyapv.sendMessage(mdata.id, image, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
      } else if (anu.action == 'remove') {
	  num = anu.participants[0]
	  mdata = await punyapv.groupMetadata(anu.jid)
      memeg = mdata.participants.length
      let w = punyapv.contacts[num] || { notify: num.replace(/@.+/, "") }
      anu_user = w.vname || w.notify || num.split("@")[0]
      time_wel = moment.tz("Asia/Jakarta").format("HH:mm")
	  try {
	  ppimg = await punyapv.getProfilePicture(`${num.split('@')[0]}@c.us`)
	  } catch {
	  ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
	  }
	  image = await getBuffer(
      `http://hadi-api.herokuapp.com/api/card/goodbye?nama=${anu_user}&descriminator=${groupMembers.length
      }&memcount=${memeg}&gcname=${encodeURI(
      mdata.subject
      )}&pp=${pp_user}&bg=https://telegra.ph/file/a3cec6902ea32d08a6db4.jpg`
      )
	  teks = `Bays @${num.split('@')[0]}\ Weno, uno menos `
	  let buff = await getBuffer(ppimg)
	  punyapv.sendMessage(mdata.id, image, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
      }
    } catch (e) {
      console.log("Error : %s", color(e, "red"))
    }

  })
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'ahora siendo observado por cambios')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()
