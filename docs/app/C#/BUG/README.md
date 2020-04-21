# C# Bug

1. 异常：'System.ArgumentException' Additional information: 'Shift_JIS' is not a supported encoding name.

开发过程中遇到字节转换时出错，主要是text.encoding中缺少了相关的字符集

* 需要引入相关依赖项

``` c#
//nuget 安装
Install-Package System.Text.Encoding.CodePages -Version 4.7.0
//命令行
dotnet add package System.Text.Encoding.CodePages --version 4.7.0
```

* 使用相关

``` C#
//运行前注册到系统中

System.Text.Encoding.RegisterProvider (System.Text.CodePagesEncodingProvider.Instance);

//代码中使用
var data = Encoding.GetEncoding("Shift_JIS").GetString(recvBytes);
```

[1.参考链接 stackoverflow](https://stackoverflow.com/questions/39065988/utf8-is-not-a-supported-encoding-name)

[2.netcore中使用encoding报错](https://www.cnblogs.com/chr-wonder/p/8464204.html)

[3.nuget](https://www.nuget.org/packages/System.Text.Encoding.CodePages/)

## mysql

1. mysql-Parameter “” must be defined
![mysql parameter must be defined](/images/mysql-Parameter-must be-defined.jpg)

a. 检查数据库列表名是否有误
b. 检查数据库字符串

``` json
连接字符串 加入 : Allow User Variables=True;
```

参考链接
[1. stackoverflow](https://stackoverflow.com/questions/51280676/parameter-must-be-defined)
[2. bbsmax](https://www.bbsmax.com/A/amd0aV31zg/)

## Bootstrap-table 文件导出

bootstrap-table 在文件导出的时候存在文件之间的依赖，因此需要选择合适的版本导出文件，经过多方尝试，使用了如下的文件成功导出。

1. [方案一 来自bootstrap-table官方](https://www.bootstrap-table.com.cn/examples/welcome/index/)

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TableExport</title>
    <!--jquery-->
    <script src="https://cdn.bootcss.com/jquery/3.4.0/jquery.min.js"></script>
    <!--bootstrap-->
    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <!--fontawesome-->
    <script src="https://cdn.bootcss.com/font-awesome/5.8.1/js/all.min.js"></script>
    <!--bootstrap-table-->
    <link href="https://cdn.bootcss.com/bootstrap-table/1.14.2/bootstrap-table.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/bootstrap-table/1.14.2/bootstrap-table.min.js"></script>
    <!--bootstrap-table-lanuage-->
    <script src="https://cdn.bootcss.com/bootstrap-table/1.14.2/bootstrap-table-locale-all.min.js"></script>
    <!--bootstrap-table-export-->
    <script src="https://cdn.bootcss.com/bootstrap-table/1.14.2/extensions/export/bootstrap-table-export.min.js"></script>
    <!--在客户端保存生成的导出文件-->
    <script src="https://cdn.bootcss.com/FileSaver.js/2014-11-29/FileSaver.min.js"></script>
    <!--以XLSX（Excel 2007+ XML格式）格式导出表（SheetJS）-->
    <script src="https://cdn.bootcss.com/xlsx/0.14.2/xlsx.core.min.js"></script>
    <!--以PNG格式导出表格-->
    <!--对于IE支持包括 html2canvas 之前的 es6-promise-->
    <script src="https://cdn.bootcss.com/es6-promise/4.1.1/es6-promise.auto.min.js"></script>
    <script src="https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.min.js"></script>
    <!--将表导出为PDF文件-->
    <script src="https://unpkg.com/tableexport.jquery.plugin/libs/jsPDF/jspdf.min.js"></script>
    <script src="https://unpkg.com/tableexport.jquery.plugin/libs/jsPDF-AutoTable/jspdf.plugin.autotable.js"></script>
    <!--无论期望的格式如何，最后都包含 tableexport.jquery.plugin（不是tableexport）-->
    <script src="https://unpkg.com/tableexport.jquery.plugin/tableExport.min.js"></script>
</head>
<body>
<div class="container">
    <div id="toolbar">
        <select class="form-control">
            <option value="">Export Basic</option>
            <option value="all">Export All</option>
            <option value="selected">Export Selected</option>
        </select>
    </div>
    <button type="button" onclick="exportData()" class=‘btn btn-mini btn-info‘>导出</button>
    <table id="table" data-locale="zh-CN"></table>
</div>
<script>
    $(function () {
        $.ajax({
            url: "https://examples.bootstrap-table.com/json/data1.json?order=asc",
            success: function (result) {
                // 初始化表格
                $(‘#toolbar‘).find(‘select‘).change(function () {
                    $(‘#table‘).bootstrapTable(‘destroy‘).bootstrapTable({
                        data: result,
                        pagination: true,//显示分页
                        clickToSelect: true,//单击列表选中
                        toolbar: "#toolbar",//显示工具栏
                        showToggle: true,//工具栏上显示列表模式切换
                        showExport: true,//工具栏上显示导出按钮
                        exportDataType: $(this).val(),//显示导出范围
                        exportTypes: [‘json‘, ‘xml‘, ‘png‘, ‘csv‘, ‘txt‘, ‘sql‘, ‘doc‘, ‘excel‘, ‘xlsx‘, ‘pdf‘],//导出格式
                        exportOptions: {//导出设置
                            fileName: ‘Tablexxx‘,//下载文件名称
                        },
                        columns: [
                            {
                                field: ‘state‘,
                                checkbox: true,
                                visible: $(this).val() === ‘selected‘
                            },
                            {
                                field: ‘id‘,
                                title: ‘ID‘
                            }, {
                                field: ‘name‘,
                                title: ‘Item Name‘
                            }, {
                                field: ‘price‘,
                                title: ‘Item Price‘
                            }
                        ]
                    })
                }).trigger(‘change‘);
            }
        });
    })
    // 自定义按钮导出数据
    function exportData(){
        $(‘#table‘).tableExport({
            type: ‘excel‘,
            exportDataType: "all",
            ignoreColumn: [0],//忽略某一列的索引
            fileName: ‘Tablexxx‘,//下载文件名称
            onCellHtmlData: function (cell, row, col, data){//处理导出内容,自定义某一行、某一列、某个单元格的内容
                console.info(data);
                return data;
            },
        });
    }
</script>
</body>
</html>
```

2. [方案二 来自网络](http://www.mamicode.com/info-detail-2669014.html)

``` js
<link href="https://unpkg.com/bootstrap-table@1.16.0/dist/bootstrap-table.min.css" rel="stylesheet">

<script src="https://unpkg.com/tableexport.jquery.plugin/tableExport.min.js"></script>
<script src="https://unpkg.com/bootstrap-table@1.16.0/dist/bootstrap-table.min.js"></script>
<script src="https://unpkg.com/bootstrap-table@1.16.0/dist/bootstrap-table-locale-all.min.js"></script>
<script src="https://unpkg.com/bootstrap-table@1.16.0/dist/extensions/export/bootstrap-table-export.min.js"></script>

<style>
  .select,
  #locale {
    width: 100%;
  }
  .like {
    margin-right: 10px;
  }
</style>

<div class="select">
  <select class="form-control" id="locale">
    <option value="af-ZA">af-ZA</option>
    <option value="ar-SA">ar-SA</option>
    <option value="ca-ES">ca-ES</option>
    <option value="cs-CZ">cs-CZ</option>
    <option value="da-DK">da-DK</option>
    <option value="de-DE">de-DE</option>
    <option value="el-GR">el-GR</option>
    <option value="en-US" selected>en-US</option>
    <option value="es-AR">es-AR</option>
    <option value="es-CL">es-CL</option>
    <option value="es-CR">es-CR</option>
    <option value="es-ES">es-ES</option>
    <option value="es-MX">es-MX</option>
    <option value="es-NI">es-NI</option>
    <option value="es-SP">es-SP</option>
    <option value="et-EE">et-EE</option>
    <option value="eu-EU">eu-EU</option>
    <option value="fa-IR">fa-IR</option>
    <option value="fi-FI">fi-FI</option>
    <option value="fr-BE">fr-BE</option>
    <option value="fr-FR">fr-FR</option>
    <option value="he-IL">he-IL</option>
    <option value="hr-HR">hr-HR</option>
    <option value="hu-HU">hu-HU</option>
    <option value="id-ID">id-ID</option>
    <option value="it-IT">it-IT</option>
    <option value="ja-JP">ja-JP</option>
    <option value="ka-GE">ka-GE</option>
    <option value="ko-KR">ko-KR</option>
    <option value="ms-MY">ms-MY</option>
    <option value="nb-NO">nb-NO</option>
    <option value="nl-NL">nl-NL</option>
    <option value="pl-PL">pl-PL</option>
    <option value="pt-BR">pt-BR</option>
    <option value="pt-PT">pt-PT</option>
    <option value="ro-RO">ro-RO</option>
    <option value="ru-RU">ru-RU</option>
    <option value="sk-SK">sk-SK</option>
    <option value="sv-SE">sv-SE</option>
    <option value="th-TH">th-TH</option>
    <option value="tr-TR">tr-TR</option>
    <option value="uk-UA">uk-UA</option>
    <option value="ur-PK">ur-PK</option>
    <option value="uz-Latn-UZ">uz-Latn-UZ</option>
    <option value="vi-VN">vi-VN</option>
    <option value="zh-CN">zh-CN</option>
    <option value="zh-TW">zh-TW</option>
  </select>
</div>

<div id="toolbar">
  <button id="remove" class="btn btn-danger" disabled>
    <i class="glyphicon glyphicon-remove"></i> Delete
  </button>
</div>
<table
  id="table"
  data-toolbar="#toolbar"
  data-search="true"
  data-show-refresh="true"
  data-show-toggle="true"
  data-show-fullscreen="true"
  data-show-columns="true"
  data-show-columns-toggle-all="true"
  data-detail-view="true"
  data-show-export="true"
  data-click-to-select="true"
  data-detail-formatter="detailFormatter"
  data-minimum-count-columns="2"
  data-show-pagination-switch="true"
  data-pagination="true"
  data-id-field="id"
  data-page-list="[10, 25, 50, 100, all]"
  data-show-footer="true"
  data-side-pagination="server"
  data-url="https://examples.wenzhixin.net.cn/examples/bootstrap_table/data"
  data-response-handler="responseHandler">
</table>

<script>
  var $table = $('#table')
  var $remove = $('#remove')
  var selections = []

  function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
      return row.id
    })
  }

  function responseHandler(res) {
    $.each(res.rows, function (i, row) {
      row.state = $.inArray(row.id, selections) !== -1
    })
    return res
  }

  function detailFormatter(index, row) {
    var html = []
    $.each(row, function (key, value) {
      html.push('<p><b>' + key + ':</b> ' + value + '</p>')
    })
    return html.join('')
  }

  function operateFormatter(value, row, index) {
    return [
      '<a class="like" href="javascript:void(0)" title="Like">',
      '<i class="fa fa-heart"></i>',
      '</a>  ',
      '<a class="remove" href="javascript:void(0)" title="Remove">',
      '<i class="fa fa-trash"></i>',
      '</a>'
    ].join('')
  }

  window.operateEvents = {
    'click .like': function (e, value, row, index) {
      alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .remove': function (e, value, row, index) {
      $table.bootstrapTable('remove', {
        field: 'id',
        values: [row.id]
      })
    }
  }

  function totalTextFormatter(data) {
    return 'Total'
  }

  function totalNameFormatter(data) {
    return data.length
  }

  function totalPriceFormatter(data) {
    var field = this.field
    return '$' + data.map(function (row) {
      return +row[field].substring(1)
    }).reduce(function (sum, i) {
      return sum + i
    }, 0)
  }

  function initTable() {
    $table.bootstrapTable('destroy').bootstrapTable({
      height: 550,
      locale: $('#locale').val(),
      columns: [
        [{
          field: 'state',
          checkbox: true,
          rowspan: 2,
          align: 'center',
          valign: 'middle'
        }, {
          title: 'Item ID',
          field: 'id',
          rowspan: 2,
          align: 'center',
          valign: 'middle',
          sortable: true,
          footerFormatter: totalTextFormatter
        }, {
          title: 'Item Detail',
          colspan: 3,
          align: 'center'
        }],
        [{
          field: 'name',
          title: 'Item Name',
          sortable: true,
          footerFormatter: totalNameFormatter,
          align: 'center'
        }, {
          field: 'price',
          title: 'Item Price',
          sortable: true,
          align: 'center',
          footerFormatter: totalPriceFormatter
        }, {
          field: 'operate',
          title: 'Item Operate',
          align: 'center',
          clickToSelect: false,
          events: window.operateEvents,
          formatter: operateFormatter
        }]
      ]
    })
    $table.on('check.bs.table uncheck.bs.table ' +
      'check-all.bs.table uncheck-all.bs.table',
    function () {
      $remove.prop('disabled', !$table.bootstrapTable('getSelections').length)

      // save your data, here just save the current page
      selections = getIdSelections()
      // push or splice the selections if you want to save all data selections
    })
    $table.on('all.bs.table', function (e, name, args) {
      console.log(name, args)
    })
    $remove.click(function () {
      var ids = getIdSelections()
      $table.bootstrapTable('remove', {
        field: 'id',
        values: ids
      })
      $remove.prop('disabled', true)
    })
  }

  $(function() {
    initTable()

    $('#locale').change(initTable)
  })
</script>
```

