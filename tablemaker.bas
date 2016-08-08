Sub getTable()
    On Error GoTo endsub
    
    Dim startCell As Range
    Dim endCell As Range
    Dim targetws As Worksheet
    
    Set targetws = Selection.Worksheet
    
    Set startCell = targetws.Range(getStartCell(Selection.Address))
    Set endCell = targetws.Range(getEndCell(Selection.Address))
    
    Dim i As Integer
    Dim j As Integer
    i = startCell.Row
    j = startCell.Column
    
    Dim cell As Range
    Dim rowspan As Integer
    Dim colspan As Integer
    Dim html As String
    
    html = "<table>"
    
    Do While i <= endCell.Row
        html = html & "<tr>"
    
        Do While j <= endCell.Column
            Set cell = targetws.Cells(i, j)
            If cell.MergeCells Then
                If cell.Value <> "" Then
                    rowspan = cell.MergeArea.Rows.Count
                    colspan = cell.MergeArea.Columns.Count
                    html = html & makehtml(cell, rowspan, colspan)
                End If
                j = j + colspan
            Else
                html = html & makehtml(cell)
                j = j + 1
            End If
        Loop
        j = startCell.Column
        i = i + 1
        html = html & "</tr>"
    Loop
    
    html = html & "</table>"
    
    targetws.Range("B10").Value = html
endsub:
End Sub

Function getStartCell(adrs As String) As String
    getStartCell = Left(adrs, InStr(1, adrs, ":") - 1)
End Function

Function getEndCell(adrs As String) As String
    getEndCell = Right(adrs, Len(adrs) - InStr(1, adrs, ":"))
End Function

Function makehtml(cell As Range, Optional rowspan = 1, Optional colspan = 1) As String
    Dim rspn As String
    Dim cspn As String
    
    makehtml = "<td" & IIf(rowspan = 1, "", " rowspan=" & rowspan) & IIf(colspan = 1, "", " colspan=" & colspan) & ">sample</td>"
End Function
