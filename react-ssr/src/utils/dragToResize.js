class DragToResize {
  constructor(el) {
    this.aside = el.current;
    this.showDragIcon = false;
    this.draging = false;
    this.mousedown = this.mousedown.bind(this);
    this.mousemove = this.mousemove.bind(this);
    this.mouseup = this.mouseup.bind(this);
  }

  mousedown() {
    if (this.showDragIcon) {
      this.draging = true;
    }
  }

  mousemove(e) {
    const { offsetX } = e;
    let { width } = this.aside.style;
    width = window.parseInt(width.split('px')[0]);
    if (Math.abs(width - offsetX) <= 5) {
      this.aside.style.cursor = 'ew-resize';
      this.showDragIcon = true;
    } else {
      if (this.draging) {
        const { clientX } = e;
        if (clientX <= 240) {
          this.aside.style.width = '240px';
        } else if (clientX >= 480) {
          this.aside.style.width = '480px';
        } else {
          this.aside.style.width = `${clientX}px`;
        }
        return;
      }
      this.aside.style.cursor = 'auto';
      this.showDragIcon = false;
    }
  }

  mouseup() {
    if (this.draging) {
      this.draging = false;
    }
  }

  init() {
    document.body.addEventListener('mousedown', this.mousedown);
    document.body.addEventListener('mousemove', this.mousemove);
    document.body.addEventListener('mouseup', this.mouseup);
  }

  remove() {
    document.body.removeEventListener('mousedown', this.mousedown);
    document.body.removeEventListener('mousemove', this.mousemove);
    document.body.removeEventListener('mouseup', this.mouseup);
  }
}

export default DragToResize;
