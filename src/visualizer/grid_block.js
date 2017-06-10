import Vector from './vector';
import CanvBlock from './canv_block';

class GridBlock extends CanvBlock {
  constructor(info, x, y) {
    super();
    this.x = x;
    this.y = y;
    this.update(info);
  }

  update({min, max, neurons}) {
    this.cLerp = this._interpolator(min, max);
    this.neurons = neurons;
  }

  draw(ctx) {
    const dx = this.dim.x / this.x;
    const dy = this.dim.y / this.y;
    for (let i = 0; i < this.neurons.length; i++) {
      const xx = i % this.x;
      const yy = Math.floor(i / this.y);
      ctx.fillStyle = this.cLerp(this.neurons[i].activation);
      ctx.fillRect(xx * dx + this.pos.x, yy * dx + this.pos.y, dx, dy);
    }
    super.draw(ctx);
  }
}

export default GridBlock;