import {useState} from 'react'

const _0 = '0deg';
const _90 = '90deg';
const _180 = '180deg';
const _270 = '270deg';

interface Orientation {
  img: string,
  rotation: string
}

const tileOrientations: { [name: string]: Orientation} = {
  b_b_b_b: {
    img: 'b-b-b-b.jpg',
    rotation: _0
  },
  b_b_b_bx: {
    img: 'b-b-b-bx.jpg',
    rotation: _0
  },
  bx_b_b_b: {
    img: 'b-b-b-bx.jpg',
    rotation: _90
  },
  b_bx_b_b: {
    img: 'b-b-b-bx.jpg',
    rotation: _180
  },
  b_b_bx_b: {
    img: 'b-b-b-bx.jpg',
    rotation: _270
  },
  b_b_bx_bx: {
    img: 'b-b-bx-bx.jpg',
    rotation: _0
  },
  bx_b_b_bx: {
    img: 'b-b-bx-bx.jpg',
    rotation: _90
  },
  bx_bx_b_b: {
    img: 'b-b-bx-bx.jpg',
    rotation: _180
  },
  b_bx_bx_b: {
    img: 'b-b-bx-bx.jpg',
    rotation: _270
  },
  b_bx_b_bx: {
    img: 'b-bx-b-bx.jpg',
    rotation: _0,
  },
  bx_b_bx_b: {
    img: 'b-bx-b-bx.jpg',
    rotation: _90,
  },
  g_g_g_g: {
    img: 'g-g-g-g.jpg',
    rotation: _0
  },
  g_g_g_gx: {
    img: 'g-g-g-gx.jpg',
    rotation: _0
  },
  gx_g_g_g: {
    img: 'g-g-g-gx.jpg',
    rotation: _90
  },
  g_gx_g_g: {
    img: 'g-g-g-gx.jpg',
    rotation: _180
  },
  g_g_gx_g: {
    img: 'g-g-g-gx.jpg',
    rotation: _270
  },
  g_g_gx_gx: {
    img: 'g-g-gx-gx.jpg',
    rotation: _0
  },
  gx_g_g_gx: {
    img: 'g-g-gx-gx.jpg',
    rotation: _90
  },
  gx_gx_g_g: {
    img: 'g-g-gx-gx.jpg',
    rotation: _180
  },
  g_gx_gx_g: {
    img: 'g-g-gx-gx.jpg',
    rotation: _270
  },
  g_gx_g_gx: {
    img: 'g-gx-g-gx.jpg',
    rotation: _0
  },
  gx_g_gx_g: {
    img: 'g-gx-g-gx.jpg',
    rotation: _90
  },
  o_o_o_o: {
    img: 'o-o-o-o.jpg',
    rotation: _0
  },
  o_o_o_ox: {
    img: 'o-o-o-ox.jpg',
    rotation: _0
  },
  ox_o_o_o: {
    img: 'o-o-o-ox.jpg',
    rotation: _90
  },
  o_ox_o_o: {
    img: 'o-o-o-ox.jpg',
    rotation: _180
  },
  o_o_ox_o: {
    img: 'o-o-o-ox.jpg',
    rotation: _270
  },
  r_r_r_r: {
    img: 'r-r-r-r.jpg',
    rotation: _0
  },
  r_r_r_rx: {
    img: 'r-r-r-rx.jpg',
    rotation: _0
  },
  rx_r_r_r: {
    img: 'r-r-r-rx.jpg',
    rotation: _90
  },
  r_rx_r_r: {
    img: 'r-r-r-rx.jpg',
    rotation: _180
  },
  r_r_rx_r: {
    img: 'r-r-r-rx.jpg',
    rotation: _270
  },
  r_r_rx_rx: {
    img: 'r-r-rx-rx.jpg',
    rotation: _0
  },
  rx_r_r_rx: {
    img: 'r-r-rx-rx.jpg',
    rotation: _90
  },
  rx_rx_r_r: {
    img: 'r-r-rx-rx.jpg',
    rotation: _180
  },
  r_rx_rx_r: {
    img: 'r-r-rx-rx.jpg',
    rotation: _270
  },
  r_rx_r_rx: {
    img: 'r-rx-r-rx.jpg',
    rotation: _0
  },
  rx_r_rx_r: {
    img: 'r-rx-r-rx.jpg',
    rotation: _90
  },
  t_t_t_t: {
    img: 't-t-t-t.jpg',
    rotation: _0
  },
  t_t_t_tx: {
    img: 't-t-t-tx.jpg',
    rotation: _0
  },
  tx_t_t_t: {
    img: 't-t-t-tx.jpg',
    rotation: _90
  },
  t_tx_t_t: {
    img: 't-t-t-tx.jpg',
    rotation: _180
  },
  t_t_tx_t: {
    img: 't-t-t-tx.jpg',
    rotation: _270
  },
  t_t_tx_tx: {
    img: 't-t-tx-tx.jpg',
    rotation: _0
  },
  tx_t_t_tx: {
    img: 't-t-tx-tx.jpg',
    rotation: _90
  },
  tx_tx_t_t: {
    img: 't-t-tx-tx.jpg',
    rotation: _180
  },
  t_tx_tx_t: {
    img: 't-t-tx-tx.jpg',
    rotation: _270
  },
  t_tx_t_tx: {
    img: 't-tx-t-tx.jpg',
    rotation: _0
  },
  tx_t_tx_t: {
    img: 'tx-t-tx-t.jpg',
    rotation: _90
  },
  y_y_y_y: {
    img: 'y-y-y-y.jpg',
    rotation: _0
  },
  y_y_y_yx: {
    img: 'y-y-y-yx.jpg',
    rotation: _0
  },
  yx_y_y_y: {
    img: 'y-y-y-yx.jpg',
    rotation: _90
  },
  y_yx_y_y: {
    img: 'y-y-y-yx.jpg',
    rotation: _180
  },
  y_y_yx_y: {
    img: 'y-y-y-yx.jpg',
    rotation: _270
  },
  y_y_yx_yx: {
    img: 'y-y-yx-yx.jpg',
    rotation: _0
  },
  yx_y_y_yx: {
    img: 'y-y-yx-yx.jpg',
    rotation: _90
  },
  yx_yx_y_y: {
    img: 'y-y-yx-yx.jpg',
    rotation: _90
  },
  y_yx_yx_y: {
    img: 'y-y-yx-yx.jpg',
    rotation: _270
  },
  y_yx_y_yx: {
    img: 'y-yx-y-yx.jpg',
    rotation: _0
  },
  yx_y_yx_y: {
    img: 'y-yx-y-yx.jpg',
    rotation: _90
  },
}

export default function useOrientation(tileString: string) {
  const [imageURL] = useState<string>(tileOrientations[tileString].img);
  const [rotation] = useState<string>(tileOrientations[tileString].rotation);

  return [imageURL, rotation];
}