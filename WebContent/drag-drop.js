/**
 * 
 */
	var dragSrcEl = null;

	function handleDragStart(e) {
		// Target (this) element is the source node.
		this.style.opacity = '0.8';

		dragSrcEl = this;

		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', this.innerHTML);
	}
	function handleDragOver(e) {
		if (e.preventDefault) {
			e.preventDefault(); // Necessary. Allows us to drop.
		}

		e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

		return false;
	}

	function handleDragEnter(e) {
		// this / e.target is the current hover target.
		this.classList.add('over');
	}

	function handleDragLeave(e) {
		this.classList.remove('over'); // this / e.target is previous target element.
	}
	function handleDrop(e) {
		// this / e.target is current target element.

		if (e.stopPropagation) {
			e.stopPropagation(); // Stops some browsers from redirecting.
		}

		// Don't do anything if dropping the same column we're dragging.
		if (dragSrcEl != this) {
			
			var srcFilterValue = dragSrcEl.querySelector('input.filter').value;
			var tgtFilterValue = this.querySelector('input.filter').value;
			// Set the source column's HTML to the HTML of the column we dropped on.
			dragSrcEl.innerHTML = this.innerHTML;
			dragSrcEl.querySelector('input.filter').value = tgtFilterValue;
			this.innerHTML = e.dataTransfer.getData('text/html');
			this.querySelector('input.filter').value = srcFilterValue;
		}
		return false;
	}

	function handleDragEnd(e) {
		var cols = document.querySelectorAll('#sums .row');
		[].forEach.call(cols, function(col) {
			col.classList.remove('over');
			col.style.opacity = '1.0';
		});
	}
	function addListeners(row) {
		row.addEventListener('dragstart', handleDragStart, false);
		row.addEventListener('dragenter', handleDragEnter, false);
		row.addEventListener('dragover',  handleDragOver, false);
		row.addEventListener('dragleave', handleDragLeave, false);
		row.addEventListener('drop',      handleDrop, false);
		row.addEventListener('dragend',   handleDragEnd, false);
	}