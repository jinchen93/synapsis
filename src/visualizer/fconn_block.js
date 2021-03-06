import Vector from './vector';
import CanvBlock from './canv_block';

class FConnBlock extends CanvBlock {
  constructor(layer) {
    super();
    this.layer = layer;
    this.update(layer);
  }

  update({blocks}) {
    this.neurons = blocks.map(blk => blk.neurons[0]);
    this.cLerp = this._interpolator(blocks[0].min, blocks[0].max);
    this.hLerp = this._interpolator(blocks[0].min, blocks[0].max, "rgba(50, 205, 50, 0.1)", "rgba(0, 100, 0, 0.1)");
  }

  getNeuronPosition(i) {
    const dx = this.dim.x / this.neurons.length;
    return new Vector(i * dx + dx / 2, this.dim.y / 2).add(this.pos);
  }

  getHighlights(pt) {
    const dx = this.dim.x / this.neurons.length;
    const delta = pt.subtract(this.pos);
    const x = Math.floor(delta.x / dx);
    const neuron = this.neurons[x];
    return { neuron: x, input_neurons: neuron.input_neurons };
  }

  setBounds(pos, dim) {
    const sx = 50;
    const centerX = pos.x + dim.x;
    dim.x = (centerX - sx) * 2;

    super.setBounds(new Vector(sx, pos.y), dim);
  }

  draw(ctx, highlightMode, inputNeurons) {
    super.draw(ctx, highlightMode);
    const dx = this.dim.x / this.neurons.length;
    for (let i = 0; i < this.neurons.length; i++) {
      let lerp;
      if (!highlightMode) {
        lerp = this.cLerp;
      } else {
        lerp = inputNeurons.includes(i) ? this.cLerp : this.hLerp;
      }
      ctx.fillStyle = lerp(this.neurons[i].activation);
      ctx.fillRect(this.pos.x + i * dx + 10, this.pos.y, dx - 10, this.dim.y);
    }
  }
}

export default FConnBlock;
