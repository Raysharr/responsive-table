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

You should specify in cells in `thead` tag classes `not-fold` then this columns wont fold, when you reach site break point.

```bash
<!-- HTML markup -->
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
	</tbody>
</table>
```
