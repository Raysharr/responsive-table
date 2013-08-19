responsive-table
================
Current version: 0.9.0 (alpha).

If you ever think about how to make table responsive, this plugin is for you. You can set which columns can be fold and set when this should happen.

Fork my plugin and check it in action. Don't forget to leave feedback and report possible BUGS. 

ENJOY!!

Usage example
-------------
You should in your js file write this code, where jQuery dom object is a refference to table which you wish to be responsive.
```bash
// Initialize responsive table plugin
$('.responsive-table').responsiveTable({
    tableBreakPoint: 768
});
```

You should specify in cells in `thead` tag classes `not-fold` then this columns wont fold, when you reach site break point

```bash
<table class="responsive-table">
    <thead>
		<tr>
			<th>#</th>
			<th class="not-fold">Header 1</th>
			<th>Header 2</th>
			<th>Header 3</th>
			<th>Header 4</th>
			<th class="not-fold">Header 5</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>1</td>
			<td>content 1</td>
			<td>content 1</td>
			<td>content 1</td>
			<td>content 1</td>
			<td>content 1</td>
		</tr>
		<tr>
			<td>2</td>
			<td>content 2</td>
			<td>content 2</td>
			<td>content 2</td>
			<td>content 2</td>
			<td>content 2</td>
		</tr>
		<tr>
			<td>3</td>
			<td>content 3</td>
			<td>content 3</td>
			<td>content 3</td>
			<td>content 3</td>
			<td>content 3</td>
		</tr>
		<tr>
			<td>4</td>
			<td>content 4</td>
			<td>content 4</td>
			<td>content 4</td>
			<td>content 4</td>
			<td>content 4</td>
		</tr>
		<tr>
			<td>5</td>
			<td>content 5</td>
			<td>content 5</td>
			<td>content 5</td>
			<td>content 5</td>
			<td>content 5</td>
		</tr>
		<tr>
			<td>6</td>
			<td>content 6</td>
			<td>content 6</td>
			<td>content 6</td>
			<td>content 6</td>
			<td>content 6</td>
		</tr>
		<tr>
			<td>7</td>
			<td>content 7</td>
			<td>content 7</td>
			<td>content 7</td>
			<td>content 7</td>
			<td>content 7</td>
		</tr>
		<tr>
			<td>8</td>
			<td>content 8</td>
			<td>content 8</td>
			<td>content 8</td>
			<td>content 8</td>
			<td>content 8</td>
		</tr>
		<tr>
			<td>9</td>
			<td>content 9</td>
			<td>content 9</td>
			<td>content 9</td>
			<td>content 9</td>
			<td>content 9</td>
		</tr>
		<tr>
			<td>10</td>
			<td>content 10</td>
			<td>content 10</td>
			<td>content 10</td>
			<td>content 10</td>
			<td>content 10</td>
		</tr>
		<tr>
			<td>11</td>
			<td>content 11</td>
			<td>content 11</td>
			<td>content 11</td>
			<td>content 11</td>
			<td>content 11</td>
		</tr>
		<tr>
			<td>12</td>
			<td>content 12</td>
			<td>content 12</td>
			<td>content 12</td>
			<td>content 12</td>
			<td>content 12</td>
		</tr>
		<tr>
			<td>13</td>
			<td>content 13</td>
			<td>content 13</td>
			<td>content 13</td>
			<td>content 13</td>
			<td>content 13</td>
		</tr>
		<tr>
			<td>14</td>
			<td>content 14</td>
			<td>content 14</td>
			<td>content 14</td>
			<td>content 14</td>
			<td>content 14</td>
		</tr>
		<tr>
			<td>15</td>
			<td>content 15</td>
			<td>content 15</td>
			<td>content 15</td>
			<td>content 15</td>
			<td>content 15</td>
		</tr>
	</tbody>
</table>
```
