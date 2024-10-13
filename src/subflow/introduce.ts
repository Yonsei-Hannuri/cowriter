const introduce = ({
  stageClassName,
  descriptionStageClassName,
  highlightClassName,
  tooltipClassName,
  curtainClassName,
}: {
  stageClassName: string;
  descriptionStageClassName: string;
  highlightClassName: string;
  tooltipClassName: string;
  curtainClassName: string;
}) => {
  const waitForClickFrom = ($elem: HTMLElement) => {
    return () => {
      return new Promise<boolean>((resolve) => {
        $elem.onclick = () => {
          resolve(true);
        };
      });
    };
  };

  class Introduce {
    private $stage: HTMLDivElement;
    private $curtain: HTMLDivElement;
    private $descriptionStage: HTMLDivElement;
    private clickEvent: () => Promise<boolean>;
    private tempBodyStyle: {
      pointerEvents: string;
      opacity: string;
      overflow: string;
    };

    constructor() {
      window.scrollTo(0, 0);

      // body related ready jobs
      const $body = document.getElementsByTagName('body')[0];
      this.tempBodyStyle = { pointerEvents: '', opacity: '', overflow: '' };
      this.tempBodyStyle.pointerEvents = $body.style.pointerEvents;
      this.tempBodyStyle.opacity = $body.style.opacity;
      this.tempBodyStyle.overflow = $body.style.overflow;
      $body.style.pointerEvents = 'none';
      $body.style.overflow = 'hidden';

      // make stage related ready jobs
      const $html = document.getElementsByTagName('html')[0];
      this.$stage = document.createElement('div');
      this.$curtain = document.createElement('div');
      this.$curtain.className = curtainClassName;
      this.$stage.className = stageClassName;
      this.$descriptionStage = document.createElement('div');
      this.$descriptionStage.className = descriptionStageClassName;
      this.$stage.append(this.$curtain, this.$descriptionStage);
      this.clickEvent = waitForClickFrom(this.$stage);
      $html.append(this.$stage);
    }

    async byPlainText(message: string[]) {
      this.$descriptionStage.innerHTML = message[0];
      for (let i = 1; (await this.clickEvent()) && i < message.length; i += 1) {
        this.$descriptionStage.innerHTML = message[i];
      }
      this.$descriptionStage.innerHTML = '';
    }

    async byClassNamesAndDescriptions(
      classNamesInOrder: string[],
      descriptionsInOrder: string[][],
    ) {
      const opacityTmp = this.$stage.style.opacity;
      this.$stage.style.opacity = '0';

      for (let i = 0; i < classNamesInOrder.length; i += 1) {
        const targets = Array.from(
          document.getElementsByClassName(
            classNamesInOrder[i],
          ) as HTMLCollectionOf<HTMLElement>,
        );
        const tempTargetClassNames = this.memoOriginalClassNames(targets);
        this.attachClassForHighlight(targets);
        const tooltips = targets.map(() => {
          const tooltip = document.createElement('span');
          tooltip.className = tooltipClassName;
          return tooltip;
        });
        const curtains = targets.map(($target) => {
          const curtain = document.createElement('div');
          curtain.className = curtainClassName;
          $target.append(curtain);
          return curtain;
        });
        targets.forEach(($target, idx) => $target.append(tooltips[idx]));
        tooltips.forEach(($elem) => {
          $elem.innerHTML = descriptionsInOrder[i][0];
          $elem.scrollIntoView();
        });
        for (
          let j = 1;
          (await this.clickEvent()) && j < descriptionsInOrder[i].length;
          j += 1
        ) {
          tooltips.forEach(($elem) => {
            $elem.innerHTML = descriptionsInOrder[i][j];
            $elem.scrollIntoView();
          });
        }
        tooltips.forEach(($tooltip) => $tooltip.remove());
        curtains.forEach(($curtain) => $curtain.remove());
        this.attachOriginalClassNames(targets, tempTargetClassNames);
      }
      window.scrollTo(0, 0);
      this.$stage.style.opacity = opacityTmp;
    }

    private attachClassForHighlight(targets: HTMLElement[]) {
      for (const $target of targets) {
        $target.className += ' ' + highlightClassName;
      }
    }

    private memoOriginalClassNames(targets: HTMLElement[]) {
      const tempTargetClassNames = [];
      for (const $target of targets) {
        tempTargetClassNames.push($target.className);
      }
      return tempTargetClassNames;
    }

    private attachOriginalClassNames(
      targets: HTMLElement[],
      tempTargetClassNames: string[],
    ) {
      for (let i = 0; i < targets.length; i += 1) {
        targets[i].className = tempTargetClassNames[i];
      }
    }

    finish() {
      const $body = document.getElementsByTagName('body')[0];
      $body.style.pointerEvents = this.tempBodyStyle.pointerEvents;
      $body.style.opacity = this.tempBodyStyle.opacity;
      $body.style.overflow = this.tempBodyStyle.overflow;
      this.$stage.remove();
    }
  }

  return Introduce;
};

export default introduce;
