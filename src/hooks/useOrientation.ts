import {useEffect, useState} from 'react'

interface Orientation {
  img: string,
  rotation: number
}

const tileOrientations: {[name: string]: Orientation} = {
  empty: {
    img: 'empty.png',
    rotation: 0
  },
  empty_empty_empty_empty: {
    img: 'empty.png',
    rotation: 0
  },
  b_b_b_b: {
    img: 'b-b-b-b.jpg',
    rotation: 0
  },
  b_b_b_bx: {
    img: 'b-b-b-bx.jpg',
    rotation: 0
  },
  bx_b_b_b: {
    img: 'b-b-b-bx.jpg',
    rotation: 90
  },
  b_bx_b_b: {
    img: 'b-b-b-bx.jpg',
    rotation: 180
  },
  b_b_bx_b: {
    img: 'b-b-b-bx.jpg',
    rotation: 270
  },
  b_b_bx_bx: {
    img: 'b-b-bx-bx.jpg',
    rotation: 0
  },
  bx_b_b_bx: {
    img: 'b-b-bx-bx.jpg',
    rotation: 90
  },
  bx_bx_b_b: {
    img: 'b-b-bx-bx.jpg',
    rotation: 180
  },
  b_bx_bx_b: {
    img: 'b-b-bx-bx.jpg',
    rotation: 270
  },
  b_bx_b_bx: {
    img: 'b-bx-b-bx.jpg',
    rotation: 0,
  },
  bx_b_bx_b: {
    img: 'b-bx-b-bx.jpg',
    rotation: 90,
  },
  g_g_g_g: {
    img: 'g-g-g-g.jpg',
    rotation: 0
  },
  g_g_g_gx: {
    img: 'g-g-g-gx.jpg',
    rotation: 0
  },
  gx_g_g_g: {
    img: 'g-g-g-gx.jpg',
    rotation: 90
  },
  g_gx_g_g: {
    img: 'g-g-g-gx.jpg',
    rotation: 180
  },
  g_g_gx_g: {
    img: 'g-g-g-gx.jpg',
    rotation: 270
  },
  g_g_gx_gx: {
    img: 'g-g-gx-gx.jpg',
    rotation: 0
  },
  gx_g_g_gx: {
    img: 'g-g-gx-gx.jpg',
    rotation: 90
  },
  gx_gx_g_g: {
    img: 'g-g-gx-gx.jpg',
    rotation: 180
  },
  g_gx_gx_g: {
    img: 'g-g-gx-gx.jpg',
    rotation: 270
  },
  g_gx_g_gx: {
    img: 'g-gx-g-gx.jpg',
    rotation: 0
  },
  gx_g_gx_g: {
    img: 'g-gx-g-gx.jpg',
    rotation: 90
  },
  o_o_o_o: {
    img: 'o-o-o-o.jpg',
    rotation: 0
  },
  o_o_o_ox: {
    img: 'o-o-o-ox.jpg',
    rotation: 0
  },
  ox_o_o_o: {
    img: 'o-o-o-ox.jpg',
    rotation: 90
  },
  o_ox_o_o: {
    img: 'o-o-o-ox.jpg',
    rotation: 180
  },
  o_o_ox_o: {
    img: 'o-o-o-ox.jpg',
    rotation: 270
  },
  r_r_r_r: {
    img: 'r-r-r-r.jpg',
    rotation: 0
  },
  r_r_r_rx: {
    img: 'r-r-r-rx.jpg',
    rotation: 0
  },
  rx_r_r_r: {
    img: 'r-r-r-rx.jpg',
    rotation: 90
  },
  r_rx_r_r: {
    img: 'r-r-r-rx.jpg',
    rotation: 180
  },
  r_r_rx_r: {
    img: 'r-r-r-rx.jpg',
    rotation: 270
  },
  r_r_rx_rx: {
    img: 'r-r-rx-rx.jpg',
    rotation: 0
  },
  rx_r_r_rx: {
    img: 'r-r-rx-rx.jpg',
    rotation: 90
  },
  rx_rx_r_r: {
    img: 'r-r-rx-rx.jpg',
    rotation: 180
  },
  r_rx_rx_r: {
    img: 'r-r-rx-rx.jpg',
    rotation: 270
  },
  r_rx_r_rx: {
    img: 'r-rx-r-rx.jpg',
    rotation: 0
  },
  rx_r_rx_r: {
    img: 'r-rx-r-rx.jpg',
    rotation: 90
  },
  t_t_t_t: {
    img: 't-t-t-t.jpg',
    rotation: 0
  },
  t_t_t_tx: {
    img: 't-t-t-tx.jpg',
    rotation: 0
  },
  tx_t_t_t: {
    img: 't-t-t-tx.jpg',
    rotation: 90
  },
  t_tx_t_t: {
    img: 't-t-t-tx.jpg',
    rotation: 180
  },
  t_t_tx_t: {
    img: 't-t-t-tx.jpg',
    rotation: 270
  },
  t_t_tx_tx: {
    img: 't-t-tx-tx.jpg',
    rotation: 0
  },
  tx_t_t_tx: {
    img: 't-t-tx-tx.jpg',
    rotation: 90
  },
  tx_tx_t_t: {
    img: 't-t-tx-tx.jpg',
    rotation: 180
  },
  t_tx_tx_t: {
    img: 't-t-tx-tx.jpg',
    rotation: 270
  },
  t_tx_t_tx: {
    img: 't-tx-t-tx.jpg',
    rotation: 0
  },
  tx_t_tx_t: {
    img: 'tx-t-tx-t.jpg',
    rotation: 90
  },
  y_y_y_y: {
    img: 'y-y-y-y.jpg',
    rotation: 0
  },
  y_y_y_yx: {
    img: 'y-y-y-yx.jpg',
    rotation: 0
  },
  yx_y_y_y: {
    img: 'y-y-y-yx.jpg',
    rotation: 90
  },
  y_yx_y_y: {
    img: 'y-y-y-yx.jpg',
    rotation: 180
  },
  y_y_yx_y: {
    img: 'y-y-y-yx.jpg',
    rotation: 270
  },
  y_y_yx_yx: {
    img: 'y-y-yx-yx.jpg',
    rotation: 0
  },
  yx_y_y_yx: {
    img: 'y-y-yx-yx.jpg',
    rotation: 90
  },
  yx_yx_y_y: {
    img: 'y-y-yx-yx.jpg',
    rotation: 180
  },
  y_yx_yx_y: {
    img: 'y-y-yx-yx.jpg',
    rotation: 270
  },
  y_yx_y_yx: {
    img: 'y-yx-y-yx.jpg',
    rotation: 0
  },
  yx_y_yx_y: {
    img: 'y-yx-y-yx.jpg',
    rotation: 90
  },
}

export default function useOrientation(tileString: string | null): [string, number] {
  
  const [imageURL, setImageURL] = useState<string>('none');
  const [rotation, setRotation] = useState<number>(0);
  
  useEffect(() => {
    if (typeof tileString === 'string') {
      setImageURL(tileOrientations[tileString].img);
      setRotation(tileOrientations[tileString].rotation);
    }
  }, [tileString])

  return [imageURL, rotation];
}