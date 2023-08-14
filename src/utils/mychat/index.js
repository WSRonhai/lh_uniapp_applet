import wsbaseUrl from './config';
export default function (matchId, agencyId, cardId) {
    let identity = agencyId + '_' + cardId;
    let wsBaseUrl = wsbaseUrl.url + matchId + '/' + identity + '/pullClient';
    return wsBaseUrl;
}
