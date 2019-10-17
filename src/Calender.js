import React from 'react';


const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const week = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];

const cdate = new Date();
const currentmonth = months[cdate.getMonth()];
const currentyear = cdate.getFullYear();
const currentdate = cdate.getDate();

class Calender extends React.Component {
    constructor(props) {
        super(props);
        
        const date = new Date(currentyear,months.indexOf(currentmonth));
        this.state = {
             month : currentmonth,
             year : currentyear,
             date : currentdate,
             startday : week[date.getDay()]
        };
     }

    renderYear = () => {
       var year = 1990;
        return (
            Array.from( new Array(41), (v,i) =>
            <option key={i} value={year+i}>{year+i}</option>)
        );
    }

    renderMonth = () => {
        return (
            months.map((m,i) => (
                <option key={i} value={m}>{m}</option>)
            )
        );
    }

    renderDays = () => {
        return (
            <tr>{week.map((w,i) => (
                <th key={i}>{w}</th>
            ))}
            </tr>
           
        );
    }

    renderDates = () => {
        console.log(this.state.year,this.state.month,this.state.startday,this.state.date);
        var day1 = week.indexOf(this.state.startday);
        var q = 0;
        var datebegin = 1;
        var dates = [];
        var len = new Date(this.state.year,months.indexOf(this.state.month)+1,0).getDate();
        console.log(len);
        Array.apply(null, {length : day1}).map(i => (
            dates.push(undefined)
        ));
        Array.apply(null, {length : len}).map((v,i) => (
            dates.push(datebegin+i)
        ));
        console.log(dates);
        return (
           Array.apply(null, {length : 5}).map((a,i) => (
                <tr key={i}>{
                    Array.apply(null, {length : 7}).map((a1,e) => (
                    <td key={e} id={this.style(q+1,day1)}>{dates[q++]}</td>
                ))}    
                </tr>
            ))
        );
    }

    style = (q,day1) => {
        if (q === this.state.date+day1 
                && currentmonth === this.state.month
                && String(currentyear) === String(this.state.year)) {
            return 'currentdate';
        }
    }

    setYear = (e) => {
        var monthname = months.indexOf(this.state.month);
        var datey = new Date(e.target.value,monthname);
        console.log('dted' + datey);
        this.setState({
            year : e.target.value,
            startday : week[datey.getDay()]
        })
    }

    setMonth = (e) => {
        var monthname = months.indexOf(e.target.value);
        var datem = new Date(this.state.year,monthname);
        console.log('dd' +datem);
        this.setState({
            month: e.target.value,
            startday : week[datem.getDay()]
        })
    }

    render() {
        return (
            <div className='heading'>
                <br />
                &nbsp;<b>Calender</b>
                &nbsp; 
                <select defaultValue={this.state.year} onChange={this.setYear}>
                    {this.renderYear()}
                </select>
                &nbsp;&nbsp; 
                <select defaultValue={this.state.month} onChange={this.setMonth}>
                     {this.renderMonth()}
                </select>
                <div className='table'>
                    <table className='students'>
                        <tbody>
                            {this.renderDays()}
                            {this.renderDates()}    
                        </tbody>
                    </table>
              </div>
            </div>
        );
    }
}

export default Calender;